import { useContext } from "react";
import { OrderContext } from "@/context/OrderContext";
import { validRegex, validEmail, validZip } from "@/constants/ValidInput";
import CountryList from "@/constants/Countries";
import {paymentType} from "@/constants/OrderEnums";

/**
 * TODO: 
 *     Complete form
 *     make a button on the bottom of this page
 *     it is grayed out by default but becomes blue when the user select a payment option
 *     upon clicking the button, validate all data in form before allowing user to proceed to entering payment information
 * 
 * Stripe Testing: 
 *  Card: 4242 4242 4242 4242.
 *  date: 12/34
 *  cvc: any three-digit CVC
 *  others; andy
 */

export default function ShippingInfo() {

    const {
        ShippingForm,
        paymentMethod,
        setPaymentMethod,
        setOpenStripe,
        setOpenPaypal
    } = useContext(OrderContext);
    //TODO: CONDITIONALLY DISPLAY A PAYMENT BUTTON BASED ON PAYMENT PROVIDER SELECTED
    //CONDITIONALLY ENABLE THE ITEM REQUIRING ALL OTHER FIELDS OF FORM TO BE COMPLETED

    
    const { register, handleSubmit, formState} = ShippingForm;
    const { errors } = formState;
    
    function submitForm(formValues) {
        if(Object.keys(errors).length > 0) return;
        
        //signal open Stripe || Paypal
        switch(paymentMethod){
            case paymentType.stripe: 
                setOpenStripe(true)
                break;
            case paymentType.paypal:
                setOpenPaypal(true)
                break; 
            default: 
                throw new Error('invalid provider');
        }
        
        return;
    }  

    return (
            <form 
                className="flex flex-col items-center justify-center h-full w-[50%] p-3 m-5"
                onSubmit={handleSubmit(submitForm)}
            >

                {/* CONTACT INFO */}
                <div className="flex justify-center w-[575px] flex-col p-6 bg-gray-300 border-8 border-b-2 border-b-black border-white">

                    <h1 className="px-5 mt-2 text-2xl font-bold">
                        Contact Info
                    </h1>

                    {/* NAME */}
                    <div className="flex p-3">

                        {/* FIRST NAME */}
                        <div className="w-56">
                            <input
                                className="p-2 mx-2 h-14 w-56"
                                placeholder="First Name"
                                type="text"
                                {...register("first_name", {
                                  required: true,
                                  pattern: validRegex,
                                })}   
                            />
                            {errors.first_name?.type === "required" && (
                                <span className="text-red-500 mx-4">required*</span>
                            )}
                            {errors.first_name?.type === "pattern" && (
                                <span className="text-red-500 mx-4">invalid*</span>
                            )}
                        </div>

                        {/* LAST NAME */}
                        <div className="w-56 mx-4">
                            <input
                                className="p-2 mx-2 h-14 w-56"
                                placeholder="Last Name"
                                type="text"
                                {...register("last_name", {
                                  required: true,
                                  pattern: validRegex,
                                })}                             
                            />
                            {errors.last_name?.type === "required" && (
                                <span className="text-red-500 mx-4">required*</span>
                            )}
                            {errors.last_name?.type === "pattern" && (
                                <span className="text-red-500 mx-4">invalid*</span>
                            )}
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="w-56">
                        <input
                            className="p-2 mx-5 mt-2 h-14 w-56"
                            placeholder="Email"
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: validEmail,
                            })}
                        />
                        {errors.email?.type === "required" && (
                            <span className="text-red-500 mx-6">required*</span>
                        )}
                        {errors.email?.type === "pattern" && (
                            <span className="text-red-500 mx-6">invalid*</span>
                        )}
                    </div>
                </div>


                {/* SHIPPING DETAILS CONTAINER */}
                <div className="flex flex-col w-[575px] h-full p-6 bg-gray-300 border-l-8 border-r-8 border-b-2 border-b-black border-white">
                    <h1 className="px-5 text-2xl font-bold">
                        Shipping
                    </h1>

                    <div className="flex items-center justify-centerf">

                        {/* COUNTRY */}
                        <div className="flex flex-col py-4">
                            <select
                                className="h-14 w-56 bg-white ml-5 p-5"
                                defaultValue=""
                               {...register("country", {
                                  required: true,
                                })}
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
                            {errors.country?.type === "required" && (
                                <span className="text-red-500 mx-6">required*</span>
                            )}
                        </div>

                        {/* STATE|PROVINCE */}
                        <div className="flex flex-col p-3">
                            <input
                                className="p-2 mx-2 h-14 w-56"
                                placeholder="State/Province"
                                type="text"
                                {...register("state_province", {
                                    required: true,
                                    pattern: validRegex,
                                })}
                            />
                            {errors.state_province?.type === "required" && (
                                <span className="text-red-500 mx-4">required*</span>
                            )}
                            {errors.state_province?.type === "pattern" && (
                                <span className="text-red-500 mx-4">invalid*</span>
                            )}
                        </div>

                    </div>
                
                    {/* CITY */}
                    <div className="flex flex-col p-3">
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="City"
                            type="text"
                            {...register("city", {
                                required: true,
                                pattern: validRegex,
                            })}
                        />
                        {errors.city?.type === "required" && (
                            <span className="text-red-500 mx-4">required*</span>
                        )}
                        {errors.city?.type === "pattern" && (
                            <span className="text-red-500 mx-4">invalid*</span>
                        )}
                    </div>

                    <div className="flex p-3">
        
                        {/* ADDRESS 1 */}
                        <div>
                            <input
                                className="p-2 mx-2 h-14 w-56"
                                placeholder="Address line 1"
                                type="text"
                                {...register("address_one",{
                                    required: true,
                                    pattern: validRegex,
                                })}
                            />
                            {errors.address_one?.type === "required" && (
                                <span className="text-red-500 mx-4">required*</span>
                            )}
                            {errors.address_one?.type === "pattern" && (
                                <span className="text-red-500 mx-4">invalid*</span>
                            )}
                        </div>
        
                        {/* ADDRESS 2 */}
                        <div>
                            <input
                                className="p-2 mx-2 h-14 w-56"
                                placeholder="apt, room, etc,)"
                                type="text"
                                {...register("address_two",{
                                    required: true,
                                    pattern: validRegex,
                                })}
                            />
                            {errors.address_two?.type === "required" && (
                                <span className="text-red-500 mx-4">required*</span>
                            )}
                            {errors.address_two?.type === "pattern" && (
                                <span className="text-red-500 mx-4">invalid*</span>
                            )}
                        </div>
                    </div>

                    {/* ZIPCODE */}
                    <div className="flex flex-col p-3">
                        <input
                            className="p-2 mx-2 h-14 w-56"
                            placeholder="zipcode"
                            type="text"
                            {...register("zip_code",{
                                required: true,
                                pattern: validZip,
                            })}         
                        />
                        {errors.zip_code?.type === "required" && (
                            <span className="text-red-500 mx-4">required*</span>
                        )}
                        {errors.zip_code?.type === "pattern" && (
                            <span className="text-red-500 mx-4">invalid*</span>
                        )}
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

                    <button
                        className={
                            paymentMethod === "PayPal" || paymentMethod === "Stripe" ? (
                                "flex text-2xl p-3 h-full w-full items-center justify-center cursor-pointer rounded-lg text-white bg-blue-500"
                            ) :
                                "flex text-2xl p-3 h-full w-full items-center justify-center cursor-pointer rounded-lg bg-gray-500"
                        }
                        disabled={Object.keys(errors).length > 0 || paymentMethod === ""}
                        type="submit"
                    >
                        Proceed Payment
                    </button>

                </div>
            </form>
    );
}