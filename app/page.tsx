import Image from "next/image";
import styles from "./page.module.css";
import { supabase } from "@/utils/supabase";
import MemberTable from "@/components/MemberTable";
import { Member } from "@/interface/Member";

export default async function Home() {
  const { data: members } = await supabase.from("CouponMember").select("*");
  const { data: coupons } = await supabase.from("Coupon").select("*");
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        {JSON.stringify(coupons)}
        <MemberTable members={members as Member[]} />
      </div>
    </main>
  );
}
