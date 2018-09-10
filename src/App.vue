<template>
      <div class="container-fluid fullBox">
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-6">
          <img  class="img-responsive center-block modalIcon" src="./assets/logo.png" draggable="false">
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6 customLogin">
            <transition name="fade" mode="out-in">
              <div v-if="mobPage" key="mobNo">
                <i v-if="invalidPhone" class="fa fa-exclamation-triangle fa-lg exclaim" aria-hidden="true"></i>
                <p v-if="invalidPhone" class="exceedLimits">{{errorMessage}}</p>
                <mat-input>
                  <input @click.once="mobFld" @keyup="enableOtpButton" v-model="mobIp" slot="ipField" type="text" class="inputMat" required>
                  <label slot="label" class="labelMat">Your Mobile Number</label>
                </mat-input>
                <transition name="slide-fade" mode="out-in">
                  <mat-input v-if="validMob" key="valid" >
                    <input slot="ipField" v-model="otpValue" type="text" class="inputMat" required @keyup="enableValidateButton" >
                    <label slot="label" class="labelMatPass center-block">OTP</label>
                  </mat-input >
                  <div v-else class="dummyDiv" key="invalid">
                  </div>
                </transition>
                <p v-if="enableBut==1" class="botButtonModal center-block" @click.once="sendOtp">Send OTP</p>
                <p v-else-if="enableBut==0" class="botButtonModalDisabled center-block">Send OTP</p>
                <p v-else-if="enableBut==2" class="botButtonModalDisabled center-block">Validate</p>
                <p v-else-if="enableBut==3" class="botButtonModal center-block" @click.once="validate">Validate</p>
              </div>
              <div v-else key="passChange">
                <mat-input>
                  <input v-model="usnIp" slot="ipField" type="text" class="inputMat" required>
                  <label slot="label" class="labelMat">New Password</label>
                </mat-input>
                <mat-input>
                  <input slot="ipField" type="password" class="inputMat" required>
                  <label slot="label" class="labelMatPass center-block">Repeat Password</label>
                </mat-input>
                <p class="botButtonModalSignUP center-block">Change Password</p>
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
      errorMessage:"",
      invalidPhone:false,
      url:"http://192.168.0.11:8000/shop/otp/reset",
      mobPage:true,
      otpValue:null,
      enableBut:0,
      usnIp: "",
      mobIp: "",
      searchInput: null,
      showSignIn: true,
      validMob: false,
      serverMsg: ""
    };
  },
    methods: {
      validate () {
        this.enableBut=2
        this.mobPage = false
      },
      enableValidateButton() {
        if (this.otpValue.length === 4) {
          this.enableBut=3
        }else {
          this.enableBut=2
        }
      },
      enableOtpButton() {
        if (this.mobIp.length === 13 || this.mobIp.length ===10) {
          if (this.mobIp.includes("+91") && this.mobIp.length === 10){
            return
          }
          this.enableBut = 1;
          //this.postMobNum(this.mobIp); // Send to server
        } else {
          this.enableBut = 0;
        }
      },
      mobFld() {
        this.mobIp = "+91";
      },
      sendOtp() {
        const cntxt = this
        this.enableBut =0
        axios.post(this.url, { "contact-no": this.mobIp})
        .then(function(response){
          console.log(response.data.message)
        if (response.data.success == true) {
          cntxt.enableBut = 2;
          cntxt.validMob=true;
        }else if (response.data.message.includes("E021")){
          cntxt.errorMessage = "We were unable to find any accounts linked to this mobile No.";
          cntxt.invalidPhone = true;

        }else if (response.data.message.includes("E022")){
          cntxt.errorMessage = "This mobile No. has exceeded the limit alloted for one day";
          cntxt.invalidPhone = true;
        }
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
.exceedLimits{
  padding-top: 45px;
    position: absolute;
    font-size: 12px;
    color: red;
}
.botButtonModalDisabled {
  width: 180px;
    border-radius: 5px;
    padding: 15px;
    color: white;
    background-color: DARKGREY;
    text-align: center;
    height: 50px;
    margin-top: 40px;
    cursor: NOT-ALLOWED;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(136, 136, 136, 0.52);
    box-shadow: inset 0 0 3px 1px rgba(136, 136, 136, 0.52);
}

.botButtonModal{
    width: 180px;
    border-radius: 5px;
    padding: 15px;
    color: white;
    background-color: #1E88E5;
    text-align: center;
    height: 50px;
    margin-top: 40px;
    cursor: pointer;
    box-shadow: 2px 2px 10px 0px rgba(136, 136, 136, 0.52);
}
.botButtonModalSignUP{
    width: 180px;
    border-radius: 5px;
    padding: 15px;
    color:white ;
    background-color: #f46150;
    text-align: center;
    height: 50px;
    margin-top: 40px;
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
      pointer-events: none;
    color:red;
    padding-left: 273px;
    padding-top: 9px;
    position: absolute;
    z-index: 100;
    }
</style>

