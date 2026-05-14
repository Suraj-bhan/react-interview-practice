"use client";
import { ClipboardEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
const otpLength = 4;
const OtpInput = () => {
    const [otp, setOtp] = useState(Array(otpLength).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (value >= "0" && value <= "9") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < otpLength - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        const key = e.key;
        if (key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            } else {
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const digits = e.clipboardData.getData("text").trim();

        const charsArr = digits.slice(0, otpLength).split("").filter((ch) => (ch >= "0" && ch <= "9"));

        const newOtp = [...otp];

        charsArr.forEach((num, i) => { newOtp[i] = num })

        setOtp(newOtp);

        if (charsArr.length < otpLength) {
            inputRefs.current[charsArr.length]?.focus();
        }
        else inputRefs.current[charsArr.length - 1]?.focus();
    }


    useEffect(() => {
        if (otp.every((value) => value >= "0" && value <= "9")) {
            alert("otp complete")
        }
    }, [otp])
    return (
        <div className="page">
            <div style={{ display: "flex", height: "100%", gap: "2px" }}>
                {otp.map((value, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => { inputRefs.current[index] = el }}
                        onPaste={handlePaste}
                        style={{
                            width: "40px",
                            height: "40px",
                            border: "1px solid gray",
                            color: "black",
                            padding: "4px"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default OtpInput;
