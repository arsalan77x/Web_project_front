import React, { useEffect, useState } from "react"
import "./ProfileInfo.scss"
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { changeProfileInfo, getUserProfile } from "./ProfileInfoApi";
import { withStyles } from "@material-ui/core";

const StyledTextField = withStyles({
    root: {
        backgroundColor: '#fff',
        flexGrow: 1,
        marginRight: '10px',
        marginBottom: '20px',
        "& label": {
            // transformOrigin: "top right",
            right: 30,
            left: "auto"
        },
        '& label.Mui-focused': {
            color: '#01bfd7',
        },
        '& .MuiFilledInput-root': {
            '& input': {
                backgroundColor: '#fff',
                borderColor: 'red',
            },
        }

    },

})(TextField);

const ProfileInfoField = props => {
    return (
        <StyledTextField
            id={props.id}
            label={props.label}
            key={props.defaultValue}
            defaultValue={props.defaultValue}
            required={props.required}
            variant="filled"
        />
    )
}

const ProfileInfoRow = props => {
    return (
        <div className="profileInfoField">
            <ProfileInfoField
                id={props.firstId}
                label={props.firstTitle}
                defaultValue={props.firstDetail}
                required={props.required} />
            <ProfileInfoField
                id={props.secondId}
                label={props.secondTitle}
                defaultValue={props.secondDetail}
                required={props.required} />
        </div>
    )
}

const ProfileInfo = (probs) => {
    const [gender, setGender] = useState("")
    const [personInfo, setPersonInfo] = useState({})

    const handleChange = (e) => {
        setGender(e.target.value)
    }

    const validate = data => {
        if (data) {
            return data
        }
        return {}
    }

    useEffect(() => {
        getUserProfile(setPersonInfo, setGender)
    }, [])


    const changeProfile = e => {
        changeProfileInfo(setPersonInfo,
            document.getElementById("profileName").value,
            document.getElementById("profileNationId").value,
            document.getElementById("profileCity").value,
            document.getElementById("profileEmail").value,
            document.getElementById("profileBirthday").value,
            document.getElementById("profileJob").value,
            gender,setGender
        )
    }
    return (
        <div className="profileInfoContainer">
            <ProfileInfoRow
                firstTitle="نام و نام خانوادگی"
                firstDetail={validate(personInfo).name}
                firstId="profileName"
                secondTitle="کد ملی"
                secondDetail={validate(personInfo).nation_id}
                secondId="profileNationId"
                required={true}
            />
            <ProfileInfoRow
                firstTitle="شهر"
                firstDetail={validate(personInfo).city}
                firstId="profileCity"
                secondTitle="ایمیل (اختیاری)"
                secondDetail={validate(personInfo).email}
                secondId="profileEmail"
            />
            <ProfileInfoRow
                firstTitle="تاریخ تولد"
                firstDetail={validate(personInfo).birthday}
                firstId="profileBirthday"
                secondTitle="شغل"
                secondDetail={validate(personInfo).job}
                secondId="profileJob"
            />
            <FormControl component="fieldset">
                <FormLabel component="legend" className="radioLabel">جنسیت</FormLabel>
                <RadioGroup row className="profileInfoRadio" value={gender}>
                    <FormControlLabel value="female" control={<Radio />} label="خانم" onClick={handleChange} />
                    <FormControlLabel value="male" control={<Radio />} label="آقا" onClick={handleChange} />
                </RadioGroup>
            </FormControl>
            {/* <ProfileInfoRow
                firstTitle="تاریخ ثبت نام"
                firstDetail={validate(personInfo).sign_up_time}
                secondTitle="تاریخ ورود به حساب"
                secondDetail={validate(personInfo).last_login_time}
            /> */}

            <div onClick={changeProfile} className="profileInfoChangeButton">
                تغییر اطلاعات
            </div>
        </div>
    )
}

export default ProfileInfo