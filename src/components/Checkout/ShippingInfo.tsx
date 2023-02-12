import { useContext, ChangeEvent } from "react";
import { OrderContext } from "@/context/OrderContext";
import { validRegex } from "@/constants/ValidInput";
import CountryList from "@/constants/Countries";

export default function ShippingInfo() {

    const {
            setFirstName,
            setLastName,
            setEmail,
            setCountry,
            setStateProvince,
            setCity,
            setAddress1,
            setAddress2,
            setZipcode,
            paymentMethod,
            setPaymentMethod,
    } = useContext(OrderContext);
    //TODO: CONDITIONALLY DISPLAY A PAYMENT BUTTON BASED ON PAYMENT PROVIDER SELECTED
    //CONDITIONALLY ENABLE THE ITEM REQUIRING ALL OTHER FIELDS OF FORM TO BE COMPLETED

    return (
            <div className="flex flex-col items-center justify-center h-full w-[50%] p-3 m-5">

                {/* CONTACT INFO */}
                <div className="flex justify-center w-[575px] flex-col p-6 bg-gray-300 border-8 border-b-2 border-b-black border-white">

                    <h1 className="px-5 mt-2 text-2xl font-bold">
                        Contact Info
                    </h1>

                    {/* NAME */}
                    <div className="p-3">

                        {/* FIRST NAME */}
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="First Name"
                            type="text"
                            pattern={`${validRegex}`}
                            onChange={(e: ChangeEvent<HTMLElement>) => { setFirstName(e.target.value) }}
                        />

                        {/* LAST NAME */}
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="Last Name"
                            type="text"
                            pattern={`${validRegex}`}
                            onChange={(e: ChangeEvent<HTMLElement>) => { setLastName(e.target.value) }}
                        />

                        {/* LAST NAME */}
                        <input
                            className="p-2 mx-2 my-4 h-14 w-56"
                            placeholder="Email"
                            type="email"
                            pattern={`${validRegex}`}
                            onChange={(e: ChangeEvent<HTMLElement>) => { setEmail(e.target.value) }}
                        />

                    </div>

                </div>


                {/* SHIPPING DETAILS CONTAINER */}
                <div className="flex flex-col w-[575px] h-full p-6 bg-gray-300 border-l-8 border-r-8 border-b-2 border-b-black border-white">
                    <h1 className="px-5 text-2xl font-bold">
                        Shipping
                    </h1>

                    <div className="flex items-center justify-centerf">

                        {/* COUNTRY */}
                        <select
                            onChange={(e: ChangeEvent<HTMLElement>) => setCountry(e.target.value)}
                            className="h-14 w-56 bg-white ml-5 p-5"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>Country</option>
                            {
                                CountryList.map((
                                    el: { name: string, label: string },
                                    index: number
                                ) => (
                                    <option
                                        value={el.name}
                                        key={index}
                                    >
                                        {el.label}
                                    </option>
                                )
                                )}
                        </select>

                        {/* STATE|PROVINCE */}
                        <div className="p-3">
                            <input
                                className="p-2 mx-2 h-14 w-56"
                                placeholder="State/Province"
                                type="email"
                                pattern={`${validRegex}`}
                                onChange={(e: ChangeEvent<HTMLElement>) => { 
                                    setStateProvince(e.target.value) 
                                }}
                            />
                        </div>

                    </div>
                
                    {/* CITY */}
                    <div className="p-3">
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="City"
                            type="email"
                            pattern={`${validRegex}`}
                            onChange={(e: ChangeEvent<HTMLElement>) => { 
                                setCity(e.target.value) 
                            }}
                        />
                    </div>

                    <div className="p-3">
        
                        {/* ADDRESS 1 */}
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="Address line 1"
                            type="email"
                            pattern={`${validRegex}`}
                            onChange={(e:ChangeEvent<HTMLElement>) => {
                                setAddress1(e.target.value) 
                            }}
                        />
        
                        {/* ADDRESS 2 */}
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="Address line 2 (apt, etc...)"
                            type="email"
                            pattern={`${validRegex}`}
                            onChange={(e: ChangeEvent<HTMLElement>) => { 
                                setAddress2(e.target.value)
                            }}
                        />
                    </div>

                    {/* ZIPCODE */}
                    <div className="p-3">
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="zipcode"
                            type="email"
                            pattern={`${validRegex}`}
                            onChange={(e: ChangeEvent<HTMLElement>) => { 
                                setZipcode(e.target.vaule)
                            }}
                        />
                    </div>
                </div>

                {/* PAYMENT OPTION SELECT */}
                <div className="bg-gray-300 w-[575px] px-6 py-2 border-8 border-t-0 border-white">
                    <h1 className="p-3 ml-3 text-2xl font-bold">
                        Payment Option
                    </h1>

                    {/* PAYMENT OPTIONS CONTAINER */}
                    <div className="flex flex-col flex-wrap w-full h-full m-3 justify-start ">
                        {/* PAYMENT METHOD SELECT */}
                        <div className="flex mb-3">
                            {/* STRIPE */}
                            <div 
                                className="flex w-24 h-12 mx-1 rounded-lg border-2 border-black cursor:pointer"
                                onClick={() => { setPaymentMethod("Stripe") }}
                            >
                                {/*Stripe LOGO*/}
                                <span
                                    className={
                                        paymentMethod === "Stripe" ? (
                                            "flex text-xl h-full w-full items-center justify-center cursor-pointer rounded-lg bg-blue-500"
                                        ) :
                                        "flex text-xl h-full w-full items-center justify-center cursor-pointer rounded-lg hover:text-blue-500 hover:border-blue-500"
                                        }
                                    >
                                        Stripe
                                </span>
                            </div>

                            {/* PAYPAL */}
                            <div
                                className="flex w-24 h-12 mx-1 rounded-lg border-2 border-black cursor:pointer"
                                onClick={() => { setPaymentMethod("PayPal") }}
                            >
                                {/*PayPal LOGO*/}
                                <span
                                    className={
                                        paymentMethod === "PayPal" ? (
                                            "flex text-xl h-full w-full items-center justify-center cursor-pointer rounded-lg bg-blue-500"
                                        ) :
                                            "flex text-xl h-full w-full items-center justify-center cursor-pointer rounded-lg hover:text-blue-500 hover:border-blue-500"
                                    }
                                >
                                    Paypal
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    );
}