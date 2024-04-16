"use client";

import { Coupon, Member } from "@/interface/Member";
import {
  Box,
  Stack,
  SxProps,
  TextField,
  Theme,
  inputClasses,
} from "@mui/material";

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
            {members.map((givMember) => (
              <Box sx={boxStyle} key={`giv-${givMember.id}`}>
                <TextField
                  value={
                    coupons.find(
                      (coupon) =>
                        coupon.id === member.id &&
                        coupon.coupon_member_id === givMember.id
                    )?.coupon_cnt || 0
                  }
                  type="number"
                  variant="standard"
                  sx={{
                    [`& .${inputClasses.root}`]: { color: "white", pl: 2.5 },
                  }}
                />
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

export default MemberTable;
