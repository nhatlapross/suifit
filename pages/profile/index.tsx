import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Image } from "@nextui-org/image";
import { useSession } from 'next-auth/react';
import LogoutIcon from "@/asset/icon/LogoutIcon";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/table";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import SwapIcon from '@/asset/icon/Swap';

const rows = [
    {
        key: "1",
        name: new Date(),
        role: "CEO",
        status: "Active",
    },
    {
        key: "2",
        name: "Zoey Lang",
        role: "Technical Lead",
        status: "Paused",
    },
    {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: "Active",
    },
    {
        key: "4",
        name: "William Howard",
        role: "Community Manager",
        status: "Vacation",
    },
];

const columns = [
    {
        key: "time",
        label: "TIME",
    },
    {
        key: "coin",
        label: "COIN",
    },
    {
        key: "number",
        label: "NUMBER",
    },
];


const Profile: React.FC = () => {
    const { data: session } = useSession() || {};
    const [selectedTab, setSelectedTab] = useState("swap");

    const minToken = 100;
    const [sellAmount, setSellAmount] = useState(1);
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellCoin, setSellCoin] = useState("ethereum");
    const [buyCoin, setBuyCoin] = useState("bitcoin");
    const [coinPrices, setCoinPrices] = useState({});

    useEffect(() => {
     
      }, [sellCoin, buyCoin]);

     const changeFrom = () => {
        setBuyAmount(0.00000235);
      }

    const swap = () => {
        toast.success('Swap successful!');
        setSellAmount(1);
        setBuyAmount(0);
    }
    
    //   useEffect(() => {
    //     if (coinPrices[sellCoin]?.usd && coinPrices[buyCoin]?.usd) {
    //       const sellPrice = coinPrices[sellCoin].usd;
    //       const buyPrice = coinPrices[buyCoin].usd;
    //       const newBuyAmount = (parseFloat(sellAmount) * sellPrice / buyPrice).toFixed(6);
    //       setBuyAmount(newBuyAmount);
    //     }
    //   }, [sellAmount, coinPrices, sellCoin, buyCoin]);
    
    //   const handleSellAmountChange = (e) => {
    //     setSellAmount(e.target.value);
    //   };
    
    //   const handleSellCoinChange = (e) => {
    //     setSellCoin(e.target.value);
    //   };
    
    //   const handleBuyCoinChange = (e) => {
    //     setBuyCoin(e.target.value);
    //   };

    return (
        <div>
            <div className="flex justify-between items-start mb-6">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* <Image src={avatar} alt='avatar' className="w-10 h-10 rounded-full border-2 border-stone-900 object-cover" /> */}
                        <Image
                            isZoomed
                            width={45}
                            radius="full"
                            alt="NextUI Fruit Image with Zoom"
                            src={session?.user?.image ?? "/path/to/default/image.jpg"
                            }
                        />
                        <span className="font-bold">{session?.user?.name}</span>
                    </div>
                </div>
                <Link href="/" className="text-white hover:text-gray-300">
                    <XMarkIcon className="h-6 w-6" />
                </Link>
            </div>
            <Card className="w-full max-w-md mx-auto">
                <CardBody className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                            <Input
                                type="text"
                                value={sellAmount.toString()}
                                onChange={(e) => changeFrom()}
                                className="w-full"
                                endContent={
                                    <h4>ICP</h4>
                                }
                            />
                            <p className="text-sm text-gray-500 mt-1">$1169.31T</p>
                        </div>

                        <div className="flex justify-center">
                            <Button isIconOnly endContent={<SwapIcon />} variant="light" className="rotate-90">
                                
                            </Button>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <Input
                                type="text"
                                value={buyAmount.toString()}
                                className="w-full"
                                endContent={
                                    <h4>ckBTC</h4>
                                }
                            />
                        </div>

                        <Button color="primary" className="w-full mt-3" onClick={()=> swap()}>
                            swap
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <div className='mt-2'>
                <Table aria-label="Example table with dynamic content mt-2">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={rows}>
                        {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <Toaster />
        </div>

    );

};

export default Profile;