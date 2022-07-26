import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, ConfigStateService, CurrentUserDto, DynamicLayoutComponent, NAVIGATE_TO_MANAGE_PROFILE, SessionStateService } from '@abp/ng.core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FlashSalePlanService } from '@proxy/easy-abp/eshop/plugins/flash-sales/flash-sale-plans';
import { CreateOrderInput, FlashSalePlanGetListInput } from '@proxy/easy-abp/eshop/plugins/flash-sales/flash-sale-plans/dtos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fakeAsync } from '@angular/core/testing';
import { FlashSaleResultService } from '@proxy/easy-abp/eshop/plugins/flash-sales/flash-sale-results';
import { PaymentService } from '@proxy/easy-abp';
import { EasyAbpPaymentService } from '@proxy/easy-abp/payment-service/payments';
import { PayInput } from '@proxy/easy-abp/payment-service/payments/dtos';
import { OrderService } from '@proxy/easy-abp/eshop/orders/orders';
import { OrderDto } from '@proxy/easy-abp/eshop/orders/orders/dtos';
import { FlashSaleResultGetListInput } from '@proxy/easy-abp/eshop/plugins/flash-sales/flash-sale-results/dtos';
import { EasyAbpEShopPayments } from '@proxy/easy-abp/eshop/payments/payments';
import { CreatePaymentDto } from '@proxy/easy-abp/eshop/payments/payments/dtos';
import { ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-pay'
  ,
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  preOrderTimeout: any;
  videMode = 2;
  lastVideMode = 0;
  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  hour: string | number = '00';
  minite: string  | number = '00';
  sec: string  | number = '00';
  day: string | number  = '0';
  timer: any;
  beginTime: any;
  orderTime: any;
  planId: string;
  orderId: string;
  state = false;
  currentUserId : string;
  orderData: OrderDto;
  constructor(
    @Inject(NAVIGATE_TO_MANAGE_PROFILE) public navigateToManageProfile, private easyShopPaymentService: EasyAbpEShopPayments,
    private configState: ConfigStateService, private _snackBar: MatSnackBar,private _payService: EasyAbpPaymentService,
    private fb: FormBuilder,private _router: Router, private flashSaleResultService: FlashSaleResultService,
    private authservice: AuthService, private flashSalePlanService : FlashSalePlanService, private orderService: OrderService,
    private confirmation: ConfirmationService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: [null],
      userName: [null],
      name: [null],
      address: [null, [Validators.required]]
    });
    this.currentUser$.subscribe(res=>{
      this.currentUserId = res.id;
    })
    this.initClock();
  }
  submitForm(): void {
    if (this.videMode == 1) {
      this.showOrHideRules();
      return;
    } else {
      if (this.state){
        this.submitOrder();
      } else {
        this._snackBar.open('活动尚未开始!','关闭',{
          duration: 2000
        });
      }
    }
  }
  jumpRouter(url: string){
    this._router.navigateByUrl(url);
  }
  logout(){
    this.authservice.logout();
    this.jumpRouter('/login');
  }
  showOrHideRules() {
    if (this.lastVideMode == 0) {
      if (this.videMode == 1) return
      this.lastVideMode = this.videMode
      this.videMode = 1
    } else {
      this.videMode = this.lastVideMode
      this.lastVideMode = 0
    }
  }
  refTime() : boolean {
    var nowTime = +(new Date()).setTime(new Date().getTime() - 2000);
    var inputTime = +new Date(this.beginTime);
    // 得到秒数
    var remain = (inputTime - nowTime) / 1000;
    if (remain < 0) {
      this.day = 0;
      this.hour = '00';
      this.minite = '00';
      this.sec= '00';
      return false;
    }
    this.day = parseInt((remain / 60 / 60 / 24).toString());
    var h = parseInt((remain / 60 / 60 % 24).toString());
    this.hour = h < 10 ? '0' + h : h;
    var m = parseInt((remain / 60 % 60).toString());
    this.minite = m < 10 ? '0' + m : m;
    var s = parseInt((remain % 60).toString());
    this.sec = s < 10 ? '0' + s : s;
    return h > 0 || m > 0 || s > 0;
  }
  preOrder(){
    if (this.preOrderTimeout) {
      clearTimeout(this.preOrderTimeout)
      this.preOrderTimeout = null
    }
    this.flashSalePlanService.preOrder(this.planId).subscribe(res=>{
      this.preOrderTimeout = setTimeout(() => {
        this.preOrder();
      }, (res.expiresInSeconds - 15) * 1000);
    }, err => {
      this._snackBar.open('获取活动商品信息失败','关闭',{
        duration: 2000
      });
    })
  }
  initClock(){
    let parm: FlashSalePlanGetListInput = {
      includeUnpublished: false,
      sorting: '',
      skipCount: 0,
      maxResultCount: 1,
      id: '',
      extraProperties: {}
    }
    this.flashSalePlanService.getList(parm).subscribe(res=>{
      this.beginTime = res.items[0].beginTime;
      this.planId = res.items[0].id;
      if (!this.refTime()) this.getSaleOrder();
      this.timer = setInterval(() => {
        if (!this.refTime()){
          this.state = true;
          clearInterval(this.timer);
        }
      }, 1000);
      this.preOrder();
    }, err =>{
      this._snackBar.open('获取活动信息失败','关闭',{
        duration: 2000
      });
    });
  }
  submitOrder(){
    let parm : CreateOrderInput = {
      id: this.planId,
      extraProperties: {},
      customerRemark: ''
    }
    this.loading = true;
    this.flashSalePlanService.order(this.planId, parm).subscribe(res=>{
      if (res.flashSaleResultId){
        this.getOrderStatus(res.flashSaleResultId);
      } else {
        this.loading = false;
        this.confirmation.error('抢购失败，谢谢参与', "抢购失败")
        this.preOrder()
      }
    }, err => {
      this.loading = false;
      this._snackBar.open('下单失败，请重试','关闭',{
        duration: 2000
      });
      this.preOrder()
    })
  }
  getOrderStatus(flashSaleResultId: string){
    this.flashSaleResultService.get(flashSaleResultId).subscribe(res=>{
      if (res.status == 1){
        this._snackBar.open('恭喜您,抢购资格成功!','关闭',{
          duration: 2000
        });
        this.loading = false;
        this.videMode = 3;
        this.orderId = res.orderId;
        this.createPayOrder();
      } else {
        setTimeout(() => {
          this.getOrderStatus(flashSaleResultId);
        }, 2000);
      }
    }, err => {
      this.loading = false;
      this._snackBar.open('获取下单结果发生错误','关闭',{
        duration: 2000
      });
    })
  }
  getSaleOrder(){
    this.loading = true;
    let parm: FlashSaleResultGetListInput = {
      planId: this.planId,
      id: null,
      skipCount: 0,
      maxResultCount: 1,
      userId: this.currentUserId,
      sorting: '',
      extraProperties : {}
    };
    this.flashSaleResultService.getList(parm).subscribe(res=>{
      if (res && res.items && res.items.length > 0 && res.items[0].orderId) {
        this.orderId = res.items[0].orderId;
        this.videMode = 3;
        this.gerOrder();
      }
      this.loading = false;
    }, err=>{
      this.loading = false;
    });
  }
  createPayOrder(){
    let payparm : CreatePaymentDto = {
      paymentMethod: 'Free',
      orderIds: [this.orderId],
      extraProperties: {}
    }
    this.easyShopPaymentService.create(payparm).subscribe(res=>{
      this.gerOrder();
    })
  }
  payOrder(){
    this.loading = true;
    let parm : PayInput = {
      extraProperties: {}
    };
    this._payService.pay(this.orderData.paymentId, parm).subscribe(res=>{
      this.loading = false;
      this._snackBar.open('恭喜您,支付成功!','关闭',{
        duration: 2000
      });
      this.gerOrder();
    }, err => {
      this.loading = false;
      this._snackBar.open('支付失败!','关闭',{
        duration: 2000
      });
    });
  }
  gerOrder(){
    this.orderService.get(this.orderId).subscribe(res=>{
      console.log(res);
      this.orderData = res;
      // 无此订单
      if (!res) {
        this.videMode = 2;
        return;
      }
      // 有订单但已取消
      if (!res || res.orderStatus == 8){
        this.videMode = 2;
        return;
      } 
      this.videMode = 4;
    }, err => {
      this._snackBar.open('查询订单信息失败','关闭',{
        duration: 2000
      });
    })
  }
}
