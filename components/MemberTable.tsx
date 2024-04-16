import { Member } from "@/interface/Member";

interface Props {
  members: Member[];
}

function MemberTable({ members }: Props) {
  return (
    <div>
      {members.map((member) => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  );
}

export default MemberTable;
