type FcmTableProps = {
  fcData: FcDataProps[];
};

type FcDataProps = {
  purcent: number;
  fc: number;
};

const fcData: FcDataProps[] = [
  {
    purcent: 50,
    fc: 120,
  },
  {
    purcent: 55,
    fc: 130,
  },
  {
    purcent: 60,
    fc: 140,
  },
];

export default function ComponentName({ fcData }: FcmTableProps) {
  return <div></div>;
}
