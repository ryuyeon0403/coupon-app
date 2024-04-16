import Image from "next/image";
import styles from "./page.module.css";
import { supabase } from "@/utils/supabase";
import MemberTable from "@/components/MemberTable";
import { Coupon, Member } from "@/interface/Member";

export const metadata = {
  title: "coupon-app",
};

export default async function Home() {
  const { data: members } = await supabase.from("CouponMember").select("*");
  const { data: coupons } = await supabase.from("Coupon").select("*");
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <MemberTable
          members={members as Member[]}
          coupons={coupons as Coupon[]}
        />
      </div>
    </main>
  );
}
