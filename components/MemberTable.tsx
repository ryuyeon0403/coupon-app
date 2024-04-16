"use client";

import { Coupon, Member } from "@/interface/Member";
import { supabase } from "@/utils/supabase";
import {
  Box,
  Stack,
  SxProps,
  TextField,
  Theme,
  inputClasses,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  members: Member[];
  coupons: Coupon[];
}

const boxStyle: SxProps<Theme> = {
  border: "0.5px solid white",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

function MemberTable({ members, coupons }: Props) {
  const [couponList, setCouponList] = useState<Coupon[]>(coupons);

  useEffect(() => {
    const channel = supabase
      .channel("realtime posts")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Coupon",
        },
        (payload) => {
          console.log(payload.new);
          setCouponList((prev) => {
            const temp = [...prev];
            const newCoupon = payload.new as Coupon;
            const findIdx = temp.findIndex(
              (coupon) => coupon.seq === newCoupon.seq
            );
            if (findIdx !== -1) {
              temp[findIdx] = newCoupon;
            }
            return temp;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const handleChange = async (seq: number, value: string) => {
    console.log(seq, value);
    const number = parseInt(value);
    const data = await supabase
      .from("Coupon")
      .update({ coupon_cnt: number })
      .eq("seq", seq);
  };

  return (
    <Stack alignItems={"flex-start"}>
      <Stack direction={"row"} alignItems={"center"}>
        <Box sx={boxStyle} />
        {members.map((member) => (
          <Box sx={boxStyle} key={member.id}>
            {member.name}
          </Box>
        ))}
      </Stack>
      <Stack alignItems={"center"}>
        {members.map((member) => (
          <Stack direction={"row"} key={member.id}>
            <Box sx={boxStyle}>{member.name}</Box>
            {members.map((givMember) => {
              const findObj = couponList.find(
                (coupon) =>
                  coupon.id === member.id &&
                  coupon.coupon_member_id === givMember.id
              );
              return (
                <Box sx={boxStyle} key={`giv-${givMember.id}`} pl={1}>
                  <TextField
                    value={findObj?.coupon_cnt || 0}
                    type="number"
                    variant="standard"
                    sx={{
                      [`& .${inputClasses.root}`]: { color: "white" },
                    }}
                    onChange={(e) =>
                      handleChange(findObj?.seq || 0, e.target.value)
                    }
                  />
                </Box>
              );
            })}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default MemberTable;
