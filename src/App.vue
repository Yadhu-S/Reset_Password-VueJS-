<template>
  <div class="container-fluid fullBox">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <img  class="img-responsive center-block modalIcon" src="./assets/logo.png" draggable="false">
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 customLogin">
        <transition name="slide-fade" mode="out-in">
          <div v-if="mobAndOtpPage" key="mobNo">
            <font-awesome-icon v-if="spinnerActive" class="spinnerPos" icon="spinner" size="lg" pulse/>
            <font-awesome-icon v-if="showFirstBoxAndIcon" class="exclaim" icon="exclamation-triangle" size="lg"/>
            <p v-if="showFirstBoxAndIcon" :class="{firstErrorDiv: firstBoxError}">{{firstBoxMessage}}</p>
            <font-awesome-icon v-if="showSecondBoxAndIcon" class="OtpExclaim" icon="exclamation-triangle" size="lg"/>
            <p v-if="showSecondBoxAndIcon" :class="{secondErrorDiv: secondBoxError}">{{secondBoxMessage}}</p>
            <mat-input>
              <input @click.once="mobFld" :readonly="mobNoFldReadOnly" @keyup="enableSendOtpButton" v-model="mobileNumber" slot="ipField" type="text" class="inputMat" :class="{disableMouseEvents:disableMouseMob}" required>
              <label slot="label" class="labelMat">Your Mobile Number</label>
            </mat-input>
            <transition name="slide-fade" mode="out-in">
              <mat-input v-if="OtpGenerated" key="valid" >
                <input slot="ipField" v-model="otpValue" type="number" maxlength="4" class="inputMat" :class="{disableMouseEvents:disableMouseOTP}" required @keyup="enableValidateButton" >
                <label slot="label" class="labelMatPass center-block">OTP</label>
              </mat-input >
              <div v-else class="dummyDiv" key="invalid">
              </div>
            </transition>
            <p v-if="mainButtonState==1" class="ButtonEnabled center-block" @click="sendOtp">Send OTP</p>
            <p v-else-if="mainButtonState==0" class="ButtonDisabled center-block">Send OTP</p>
            <p v-else-if="mainButtonState==2" class="ButtonDisabled center-block">Verify</p>
            <p v-else-if="mainButtonState==3" class="ButtonEnabled center-block" @click.once="validate">Verify</p>
          </div>
          <div v-else key="passChange">
            <font-awesome-icon v-if="spinnerActive" class="spinnerPosResetPassword" icon="spinner" size="lg" pulse/>
            <font-awesome-icon v-if="passChanged" :class="{secondSuccessIcon:showThirdBoxAndIcon}" icon="check-circle" size="lg"/>
            <p :class="{secondSuccessDiv:showThirdBoxAndIcon}">{{secondBoxMessage}}</p>
            <mat-input>
              <input v-model="newPassword" :class="{disableMouseEvents:passChanged}" slot="ipField" type="password" class="inputMat" required>
              <label slot="label" class="labelMat">New Password</label>
            </mat-input>
            <mat-input>
              <input v-model="repeatPassword" :class="{disableMouseEvents:passChanged}" slot="ipField" type="password" class="inputMat" required>
              <label slot="label" class="labelMatPass center-block">Repeat Password</label>
            </mat-input>

            <p class="botButtonModalSignUP center-block" :class="{disableMouseEvents:passChanged, ButtonDisabled:passChanged}" @click="postPassword">Reset Password</p>
          </div>
        </transition>
        <div>
            <h6 class="loginFooter">By signing in you agree to 123 Find's Terms of Service, Privacy Policy and Conditions</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatInputBox from "./components/InputBoxMaterial.vue"
import axios from 'axios'

export default {
  name: 'app',
  components: {
    'mat-input' : MatInputBox
  },
  data() {
    return {
      passChanged:false,
      disableMouseOTP:false,
      disableMouseMob:false,
      mobNoFldReadOnly:false,
      spinnerActive:false,
      secondBoxError:false,
      firstBoxError:false,
      firstBoxMessage:"",
      secondBoxMessage:"",
      secondBoxSuccess:false,
      showFirstBoxAndIcon:false,
      showSecondBoxAndIcon:false,
      showThirdBoxAndIcon:true,
      postUrl:"http://192.168.0.11:8000",
      mobAndOtpPage:true,
      otpValue:null,
      mainButtonState:0,
      newPassword: "",
      repeatPassword:"",
      mobileNumber: "",
      searchInput: null,
      showSignIn: true,
      OtpGenerated: false,
    };
  },
    methods: {
      postPassword(){
        console.log("hi")
        this.spinnerActive = true
        const ctx = this
        if (this.newPassword == this.repeatPassword) {
          axios.post(this.postUrl+"/shop/password/reset", { "contact-no": this.mobileNumber, "otp":parseInt(this.otpValue),"new-password":this.newPassword})
          .then(function(response){
            console.log(response)
            if (response.data.success == true){
              ctx.secondBoxMessage = "Your password was reset"
              ctx.showThirdBoxAndIcon = true
              ctx.passChanged = true
              ctx.secondBoxSuccess = true
            }else {
              ctx.secondBoxSuccess = false
            }
            ctx.spinnerActive = false
          })
        }
      },
      validate () {
        const ctx = this
        this.spinnerActive = true
        axios.post(this.postUrl+"/shop/validate", { "contact-no": this.mobileNumber, "otp":parseInt(this.otpValue)},"")
        .then(function(response){
           console.log(response)
          if (response.data.success == true) {
          ctx.mainButtonState=2
          ctx.mobAndOtpPage = false
          }else{
            if (response.data.message.includes("E023")){
              ctx.secondBoxMessage = "OTP Expired"
              ctx.secondBoxError = true
            } else if (response.data.message.includes("E014")){
              ctx.secondBoxMessage = "Invalid OTP"
              ctx.secondBoxError = true
            }
            ctx.showSecondBoxAndIcon = true
          }
          ctx.spinnerActive = false
        })
      },
      enableValidateButton() {
        if (this.otpValue.length === 4) {
          this.mainButtonState=3
        }else {
          this.mainButtonState=2
        }
      },
      enableSendOtpButton() {
        this.OtpGenerated = false;
        this.showFirstBoxAndIcon=false;
        if (this.mobileNumber.length === 13 || this.mobileNumber.length ===10) {
          if (this.mobileNumber.includes("+91") && this.mobileNumber.length === 10){
            return
          }
          this.mainButtonState = 1;
          //this.postMobNum(this.mobileNumber); // Send to server
        } else {
          this.mainButtonState = 0;
        }
      },
      mobFld() {
        this.mobileNumber = "+91";
      },
      sendOtp() {
        //this.mobNoFldReadOnly = true
        this.disableMouseMob = true
        const cntxt = this
        this.mainButtonState = 0
        this.spinnerActive = true
        axios.post(this.postUrl+"/shop/otp/reset", { "contact-no": this.mobileNumber})
          .then(function(response){
            console.log(response.data.message)
          if (response.data.success == true) {
            cntxt.mainButtonState = 2;
            cntxt.OtpGenerated=true;
          }else if (response.data.message.includes("E021")){
            cntxt.firstBoxMessage = "We were unable to find any accounts linked to this mobile No.";
            cntxt.firstBoxError = true;
            cntxt.showFirstBoxAndIcon = true;

          }else if (response.data.message.includes("E022")){
            cntxt.firstBoxMessage = "This mobile No. has exceeded the limit alloted for one day";
            cntxt.showFirstBoxAndIcon = true;
            cntxt.firstBoxError = true;
          }
          cntxt.spinnerActive = false
        });

      }
    }
}
</script>

<style>
.fullBox{
      padding-top: 200px;
    /* margin-top: 500px; */
    margin: auto;
    height: 500px;
    width: 735px;
}

.dummyDiv{
  height: 67px;
}
/* transition animations */
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.firstErrorDiv{
  padding-top: 45px;
    position: absolute;
    font-size: 12px;
    color: red;
}
.secondErrorDiv{
  padding-top: 107px;
    position: absolute;
    font-size: 12px;
    color: red;
}
.secondSuccessDiv{
  margin-left: 33px;
    margin-top: 113px;
    position: absolute;
    font-size: 14px;
    color: green;
}
.secondSuccessIcon{
    margin-top: 112px;
    position: absolute;
    color: green;
}
.ButtonDisabled {
  width: 180px;
    border-radius: 5px;
    padding: 15px;
    color: white;
    background-color: DARKGREY;
    text-align: center;
    height: 50px;
   margin-top:59px;
    cursor: NOT-ALLOWED;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(136, 136, 136, 0.52);
    box-shadow: inset 0 0 3px 1px rgba(136, 136, 136, 0.52);
}

.ButtonEnabled{
    width: 180px;
    border-radius: 5px;
    padding: 15px;
    color: white;
    background-color: #1E88E5;
    text-align: center;
    height: 50px;
   margin-top:59px;
    cursor: pointer;
    box-shadow: 2px 2px 10px 0px rgba(136, 136, 136, 0.52);
}

.ButtonEnabled:active{
    width: 180px;
    border-radius: 5px;
    padding: 15px;
    color: white;
    background-color: #1E88E5;
    text-align: center;
    height: 50px;
   margin-top:59px;
    cursor: pointer;
    box-shadow: inset 0px 0px 8px 3px rgba(136, 136, 136, 0.52);
}
.botButtonModalSignUP:active{
    width: 180px;
    border-radius: 5px;
    padding: 15px;
    color:white ;
    background-color: #f46150;
    text-align: center;
    height: 50px;
   margin-top:59px;
    cursor: pointer;
    box-shadow: inset 0px 0px 8px 3px rgba(136, 136, 136, 0.52);
}

.botButtonModalSignUP{
    width: 180px;
    border-radius: 5px;
    padding: 15px;
    color:white ;
    background-color: #f46150;
    text-align: center;
    height: 50px;
   margin-top:59px;
    cursor: pointer;
    box-shadow: 2px 2px 10px 0px rgba(136, 136, 136, 0.52);
}
.loginFooter{
  font-size: 11px;
  text-align: center;
  color: gray;
  margin-top: 35px;
}
    .modalIcon{
      margin-top: 44%;
      max-width: 180px;
    }
    .mainLinks {
      cursor: pointer;
    }
    .mainLinks:hover {
        color:#f46150;
    }
    .input-search {
        border-radius:2px;
        background-color: #fff;
        box-shadow: none;
        border: none;
        border-right: 1px solid #fff;
        padding-right: 32px;
    }

    .input-search:focus {
        box-shadow: none;
    }

    .input-group .form-control:first-child, .input-group-addon:first-child, .input-group-btn:first-child>.btn, .input-group-btn:first-child>.btn-group>.btn, .input-group-btn:first-child>.dropdown-toggle, .input-group-btn:last-child>.btn-group:not(:last-child)>.btn, .input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle) {
        border: 1px solid;
        border-color: #748c8d;
        border-radius: 22px;
    }

    .input-group-btn:last-child>.btn, .input-group-btn:last-child>.btn-group {
        z-index: 10;
        color: #748c8d;
        background-color: transparent;
    }

    .search-bar {
        width: 100%;
    }
    .search-bar .input-group-btn {
        position: absolute;
        font-size: 0;
        right: 35px;
    }

    .btn-search:hover,.btn-search:focus, .btn-search:active, .btn-search:visited {
    outline: none;
    color: #fff;
    width: 41px;
    border-bottom-right-radius: 40px;
    border-top-right-radius: 40px;
    /* box-shadow: none; */
    }
    .icons{
        color: #748c8d;
        margin-right:20px;
        cursor: pointer;
    }
    .icons:active{
      box-shadow: inset 2px 2px 10px 0px rgba(136, 136, 136, 0.52);
    }
    @media screen and (max-width:900px){
        .icons{
            padding-right: 10px;
        }
    }
    .fa-search:before {
        text-shadow: -1px 1px 3px #888888;
        font-size: 20px;
    }
    #logoTop{
            margin-top: -5px;
            padding-bottom: 2px;
            max-width: 150px;
    }
    .fa-sign-in:before {
        content: "\f090";
        font-size: 16px;
    }
    .topList{
        color: white;
        padding: 20px;
        padding-top: 7px;
        padding-bottom: 7px;
        text-decoration: none;
    }
    .topList:hover{
        cursor: pointer;
        border-radius: 17px;
        background-color: #f46150;
        color: white;
        text-decoration: none;
    }
    #navBottomBar{
        margin-bottom: 20px;
        text-align: center;
        background-color: #455e74;
        padding-top: 9px;
        padding-bottom: 7px;
        border-bottom-style: solid;
        border-bottom-color: #e2e2e2;
        border-bottom-width: 1px;
    }
    #fixNav {
        padding-bottom: 5px;
        position: relative;
        z-index: 20;
        width: 100%;
        background-color: white;
    }
    .nearShop{
        height: 350px;
        background-color: #f6a0a3;
        color: #fff;
    }
    .exclaim{
      pointer-events: all;
      color:red;
      margin-left: 273px;
      margin-top: 9px;
      position: absolute;
      z-index: 100;
    }
    .OtpExclaim{
      pointer-events: none;
    color:red;
    margin-left: 273px;
    margin-top: 72px;
    position: absolute;
    z-index: 100;
    }
    .spinnerPosResetPassword{
      z-index: 100;
      pointer-events: none;
      color: white;
    position: absolute;
    margin-left: 72px;
    margin-top: 172px;
    }
    .spinnerPos{
      z-index: 100;
      pointer-events: none;
      color: white;
    position: absolute;
    margin-left: 83px;
    margin-top: 177px;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        margin: 0;
    }
    .disableMouseEvents{
      pointer-events: none;
    }
</style>

