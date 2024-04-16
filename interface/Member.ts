export interface Member {
  id: number;
  name: string;
}

export interface Coupon {
  seq: number;
  id: number;
  coupon_member_id: number;
  coupon_cnt: number;
}
