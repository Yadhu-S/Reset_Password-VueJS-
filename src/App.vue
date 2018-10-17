<template>
  <div class="container-fluid fullBox">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
        <img  class="img-responsive center-block modalIcon" src="./assets/logo.png" draggable="false">
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 customLogin">
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
            <p v-ripple v-if="mainButtonState==1" class="ButtonEnabled center-block" @click="sendOtp">Send OTP</p>
            <p v-else-if="mainButtonState==0" class="ButtonDisabled center-block">Send OTP</p>
            <p v-else-if="mainButtonState==2" class="ButtonDisabled center-block">Verify</p>
            <p v-ripple v-else-if="mainButtonState==3" class="ButtonEnabled center-block" @click.once="validate">Verify</p>
          </div>
          <div v-else key="passChange">
            <font-awesome-icon v-if="spinnerActive" class="spinnerPosResetPassword" icon="spinner" size="lg" pulse/>
            <font-awesome-icon v-if="passChanged" :class="{secondSuccessIcon:showThirdBoxAndIcon}" icon="check-circle" size="lg"/>
            <font-awesome-icon v-if="showPassExclaimIcon" class="exclaim-repeat" icon="exclamation-triangle" size="lg"/>
            <font-awesome-icon v-if="showPassLengthExclaimIcon" class="exclaim" icon="exclamation-triangle" size="lg"/>
            <p v-if="showPassLengthExclaimIcon" :class="{firstErrorDiv: firstBoxError}">{{firstBoxMessage}}</p>
            <p :class="{secondSuccessDiv:showThirdBoxAndIcon, secondPageSecondErrorDiv:repeatPasswordError}">{{secondBoxMessage}}</p>
            <mat-input>
              <input v-model="newPassword" :class="{disableMouseEvents:passChanged}" slot="ipField" type="password" class="inputMat" required @blur="verifyPasswordLength">
              <label slot="label" class="labelMat">New Password</label>
            </mat-input>
            <mat-input>
              <input v-model="repeatPassword" :class="{disableMouseEvents:passChanged}" slot="ipField" type="password" class="inputMat" required @keyup="verifyPasswords">
              <label slot="label" class="labelMatPass center-block">Repeat Password</label>
            </mat-input>
            <p v-ripple class="center-block" :class="{botButtonModalSignUP:!passChanged, ButtonDisabled:passChanged,resetSuccess:passChanged }" @click="postPassword">{{secondButtonMessage}}</p>
          </div>
        </transition>
        <div>
            <h6 class="loginFooter">By using our service, you agree to our <i class="tosStyle" @click="show">Terms of Service</i>, <i class="tosStyle" @click="showPrivacy">Privacy Policy</i> and Conditions</h6>
        </div>
      </div>
    </div>
    <modal name="privacyPolicy" height="auto" :scrollable="true">
      <div class="tosContent">
      <h1>Privacy policy</h1>

      <p>This privacy policy ("Policy") describes how Leadler Technologies Private Limited ("Leadler Technologies Private Limited", "we", "us" or "our") collects, protects and uses the personally identifiable information ("Personal Information") you ("User", "you" or "your") may provide on the <a target="_blank" rel="nofollow" href="https://www.shopnitt.com">shopnitt.com</a> website and any of its products or services (collectively, "Website" or "Services"). It also describes the choices available to you regarding our use of your Personal Information and how you can access and update this information. This Policy does not apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.</p>

      <h2>Collection of personal information</h2>

      <p>We receive and store any information you knowingly provide to us when you create an account, publish content, make a purchase, fill any online forms on the Website.  When required this information may include your email address, name, phone number, address, credit card information, bank information,  or other Personal Information. You can choose not to provide us with certain information, but then you may not be able to take advantage of some of the Website's features. Users who are uncertain about what information is mandatory are welcome to contact us.</p>

      <h2>Collection of non-personal information</h2>

      <p>When you visit the Website our servers automatically record information that your browser sends. This data may include information such as your device's IP address, browser type and version, operating system type and version, language preferences or the webpage you were visiting before you came to our Website, pages of our Website that you visit, the time spent on those pages, information you search for on our Website, access times and dates, and other statistics.</p>

      <h2>Use and processing of collected information</h2>

      <p>Any of the information we collect from you may be used to personalize your experience; improve our Website; improve customer service and respond to queries and emails of our customers; process transactions; send notification emails such as password reminders, updates, etc;  run and operate our Website and Services. Non-Personal Information collected is used only to identify potential cases of abuse and establish statistical information regarding Website usage. This statistical information is not otherwise aggregated in such a way that would identify any particular user of the system.</p>

      <p>We may process Personal Information related to you if one of the following applies: (i) You have given their consent for one or more specific purposes. Note that under some legislations we may be allowed to process information until you object to such processing (by opting out), without having to rely on consent or any other of the following legal bases below. This, however, does not apply, whenever the processing of Personal Information is subject to European data protection law; (ii) Provision of information is necessary for the performance of an agreement with you and/or for any pre-contractual obligations thereof; (ii) Processing is necessary for compliance with a legal obligation to which you are subject; (iv) Processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in us; (v) Processing is necessary for the purposes of the legitimate interests pursued by us or by a third party. In any case, we will be happy to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>

      <h2>Information transfer and storage</h2>

      <p>Depending on your location, data transfers may involve transferring and storing your information in a country other than your own. You are entitled to learn about the legal basis of information transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and about the security measures taken by us to safeguard your information. If any such transfer takes place, you can find out more by checking the relevant sections of this document or inquire with us using the information provided in the contact section.</p>

      <h2>The rights of users</h2>

      <p>You may exercise certain rights regarding your information processed by us. In particular, you have the right to do the following: (i) you have the right to withdraw consent where you have previously given your consent to the processing of your information; (ii) you have the right to object to the processing of your information if the processing is carried out on a legal basis other than consent; (iii) you have the right to learn if information is being processed by us, obtain disclosure regarding certain aspects of the processing and obtain a copy of the information undergoing processing; (iv) you have the right to verify the accuracy of your information and ask for it to be updated or corrected; (v) you have the right, under certain circumstances, to restrict the processing of your information, in which case, we will not process your information for any purpose other than storing it; (vi) you have the right, under certain circumstances, to obtain the erasure of your Personal Information from us; (vii) you have the right to receive your information in a structured, commonly used and machine readable format and, if technically feasible, to have it transmitted to another controller without any hindrance. This provision is applicable provided that your information is processed by automated means and that the processing is based on your consent, on a contract which you are part of or on pre-contractual obligations thereof.</p>

      <h2>The right to object to processing</h2>

      <p>Where Personal Information is processed for a public interest, in the exercise of an official authority vested in us or for the purposes of the legitimate interests pursued by us, you may object to such processing by providing a ground related to your particular situation to justify the objection. You must know that, however, should your Personal Information be processed for direct marketing purposes, you can object to that processing at any time without providing any justification. To learn, whether we are processing Personal Information for direct marketing purposes, you may refer to the relevant sections of this document.</p>

      <h2>How to exercise these rights</h2>

      <p>Any requests to exercise User rights can be directed to the Owner through the contact details provided in this document. These requests can be exercised free of charge and will be addressed by the Owner as early as possible and always within one month.</p>

      <h2>Billing and payments</h2>

      <p>We use third-party payment processors to assist us in processing your payment information securely. Such third-party processors' use of your Personal Information is governed by their respective privacy policies which may or may not contain privacy protections as protective as this Privacy Policy. We suggest that you review their respective privacy policies.</p>

      <h2>Product and service providers</h2>

      <p>We may contract with other companies to provide certain products and services. These service providers are not authorized to use or disclose the information except as necessary to perform services on our behalf or comply with legal requirements. We may share Personal Information for these purposes only with third-parties whose privacy policies are consistent with ours or who agree to abide by our policies with respect to Personal Information Our service providers are given the information they need to perform their designated functions, and we do not authorize them to use or disclose Personal Information for their own marketing or other purposes.</p>

      <h2>Privacy of children</h2>

      <p>We do not knowingly collect any Personal Information from children under the age of 13. If you are under the age of 13, please do not submit any Personal Information through our Website or Service. We encourage parents and legal guardians to monitor their children's Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through our Website or Service without their permission. If you have reason to believe that a child under the age of 13 has provided Personal Information to us through our Website or Service, please contact us.</p>

      <h2>Newsletters</h2>

      <p>We offer electronic newsletters to which you may voluntarily subscribe at any time. You may choose to stop receiving our newsletter or marketing emails by following the unsubscribe instructions included in these emails or by contacting us. However, you will continue to receive essential transactional emails.</p>

      <h2>Cookies</h2>

      <p>The Website uses "cookies" to help personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you. We may use cookies to collect, store, and track information for statistical purposes to operate our Website and Services. You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the features of the Website and Services.</p>

      <p>In addition to using cookies and related technologies as described above, we also may permit certain third-party companies to help us tailor advertising that we think may be of interest to users and to collect and use other data about user activities on the Website. These companies may deliver ads that might also place cookies and otherwise track user behavior.</p>

      <h2>Advertisement</h2>

      <p>We may display online advertisements and we may share aggregated and non-identifying information about our customers that we collect through the registration process or through online surveys and promotions with certain advertisers. We do not share personally identifiable information about individual customers with advertisers. In some instances, we may use this aggregated and non-identifying information to deliver tailored advertisements to the intended audience.</p>

      <h2>Affiliates</h2>

      <p>We may disclose information about you to our affiliates for the purpose of being able to offer you related or additional products and services. Any information relating to you that we provide to our affiliates will be treated by those affiliates in accordance with the terms of this Privacy Policy.</p>

      <h2>Links to other websites</h2>

      <p>Our Website contains links to other websites that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other websites or third-parties. We encourage you to be aware when you leave our Website and to read the privacy statements of each and every website that may collect Personal Information.</p>

      <h2>Information security</h2>

      <p>We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to protect against unauthorized access, use, modification, and disclosure of Personal Information in its control and custody. However, no data transmission over the Internet or wireless network can be guaranteed. Therefore, while we strive to protect your Personal Information, you acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our control; (ii) the security, integrity, and privacy of any and all information and data exchanged between you and our Website cannot be guaranteed; and (iii) any such information and data may be viewed or tampered with in transit by a third-party, despite best efforts.</p>

      <h2>Data breach</h2>

      <p>In the event we become aware that the security of the Website has been compromised or users Personal Information has been disclosed to unrelated third-parties as a result of external activity, including, but not limited to, security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities. In the event of a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the user as a result of the breach or if notice is otherwise required by law. When we do we will post a notice on the Website.</p>

      <h2>Legal disclosure</h2>

      <p>In the event we go through a business transition, such as a merger or acquisition by another company, or sale of all or a portion of its assets, your user account and personal data will likely be among the assets transferred.</p>

      <h2>Changes and amendments</h2>

      <p>We reserve the right to modify this privacy policy relating to the Website or Services at any time, effective upon posting of an updated version of this Policy on the Website. When we do we will post a notification on the main page of our Website. Continued use of the Website after any such changes shall constitute your consent to such changes.</p>

      <h2>Acceptance of this policy</h2>

      <p>You acknowledge that you have read this Policy and agree to all its terms and conditions. By using the Website or its Services you agree to be bound by this Policy. If you do not agree to abide by the terms of this Policy, you are not authorized to use or access the Website and its Services.</p>

      <h2>Contacting us</h2>

      <p>If you have any questions about this Policy, please contact us.</p>

      <p>This document was last updated on October 15, 2018</p>
      </div>
    </modal>
    <modal name="tos" height="auto" :scrollable="true">
      <div class="tosContent"> 
        <h1>Terms and conditions</h1>

        <p>These terms and conditions ("Terms", "Agreement") are an agreement between Leadler Technologies Private Limited ("Leadler Technologies Private Limited", "us", "we" or "our") and you ("User", "you" or "your"). This Agreement sets forth the general terms and conditions of your use of the Shopnitt application and any of its products or services (collectively, "Application" or "Services").</p>

        <h2>Accounts and membership</h2>

        <p>You must be at least 18 years of age to use this Application. By using this Application and by agreeing to this Agreement you warrant and represent that you are at least 18 years of age. If you create an account in the Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.</p>

        <h2>User content</h2>

        <p>We do not own any data, information or material ("Content") that you submit in the Application in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may, but have no obligation to, monitor Content in the Application submitted or created using our Services by you. Unless specifically permitted by you, your use of the Application does not grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose. But you grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you. Without limiting any of those representations or warranties, we have the right, though not the obligation, to, in our own sole discretion, refuse or remove any Content that, in our reasonable opinion, violates any of our policies or is in any way harmful or objectionable.</p>

        <h2>Billing and payments</h2>

        <p>You shall pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. Where Services are offered on a free trial basis, payment may be required after the free trial period ends, and not when you enter your billing details (which may be required prior to the commencement of the free trial period). If auto-renewal is enabled for the Services you have subscribed for, you will be charged automatically in accordance with the term you selected. If, in our judgment, your purchase constitutes a high-risk transaction, we will require you to provide us with a copy of your valid government-issued photo identification, and possibly a copy of a recent bank statement for the credit or debit card used for the purchase. We reserve the right to change products and product pricing at any time. We also reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.</p>

        <h2>Accuracy of information</h2>

        <p>Occasionally there may be information in the Application that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, product shipping charges, availability, promotions and offers. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Application or on any related Service is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information in the Application including, without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Application should be taken to indicate that all information in the Application or on any related Service has been modified or updated.</p>

        <h2>Third-party services</h2>

        <p>If you decide to enable, access or use third-party services, be advised that your access and use of such other services are governed solely by the terms and conditions of such other services, and we do not endorse, are not responsible or liable for, and make no representations as to any aspect of such other services, including, without limitation, their content or the manner in which they handle data (including your data) or any interaction between you and the provider of such other services. You irrevocably waive any claim against Leadler Technologies Private Limited with respect to such other services. Leadler Technologies Private Limited is not liable for any damage or loss caused or alleged to be caused by or in connection with your enablement, access or use of any such other services, or your reliance on the privacy practices, data security processes or other policies of such other services. You may be required to register for or log into such other services on their respective applications. By enabling any other services, you are expressly permitting Leadler Technologies Private Limited to disclose your data as necessary to facilitate the use or enablement of such other service.</p>

        <h2>Backups</h2>

        <p>We perform regular backups of the Content and will do our best to ensure completeness and accuracy of these backups. In the event of the hardware failure or data loss we will restore backups automatically to minimize the impact and downtime.</p>

        <h2>Links to other applications</h2>

        <p>Although this Application may be linked to other applications, we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked application, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their applications. We do not assume any responsibility or liability for the actions, products, services, and content of any other third-parties. You should carefully review the legal statements and other conditions of use of any application which you access through a link from this Application. Your linking to any other off-site applications is at your own risk.</p>

        <h2>Advertisements</h2>

        <p>During use of the Application, you may enter into correspondence with or participate in promotions of advertisers or sponsors showing their goods or services through the Application. Any such activity, and any terms, conditions, warranties or representations associated with such activity, is solely between you and the applicable third-party. We shall have no liability, obligation or responsibility for any such correspondence, purchase or promotion between you and any such third-party.</p>

        <h2>Prohibited uses</h2>

        <p>In addition to other terms as set forth in the Agreement, you are prohibited from using the Application or its Content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related application, other applications, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related application, other applications, or the Internet. We reserve the right to terminate your use of the Service or any related application for violating any of the prohibited uses.</p>

        <h2>Intellectual property rights</h2>

        <p>This Agreement does not transfer to you any intellectual property owned by Leadler Technologies Private Limited or third-parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with Leadler Technologies Private Limited. All trademarks, service marks, graphics and logos used in connection with our Application or Services, are trademarks or registered trademarks of Leadler Technologies Private Limited or Leadler Technologies Private Limited licensors. Other trademarks, service marks, graphics and logos used in connection with our Application or Services may be the trademarks of other third-parties. Your use of our Application and Services grants you no right or license to reproduce or otherwise use any Leadler Technologies Private Limited or third-party trademarks.</p>

        <h2>Disclaimer of warranty</h2>

        <p>You agree that your use of our Application or Services is solely at your own risk. You agree that such Service is provided on an "as is" and "as available" basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranty that the Services will meet your requirements, or that the Service will be uninterrupted, timely, secure, or error-free; nor do we make any warranty as to the results that may be obtained from the use of the Service or as to the accuracy or reliability of any information obtained through the Service or that defects in the Service will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of Service is done at your own discretion and risk and that you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material and/or data. We make no warranty regarding any goods or services purchased or obtained through the Service or any transactions entered into through the Service. No advice or information, whether oral or written, obtained by you from us or through the Service shall create any warranty not expressly made herein.</p>

        <h2>Limitation of liability</h2>

        <p>To the fullest extent permitted by applicable law, in no event will Leadler Technologies Private Limited, its affiliates, officers, directors, employees, agents, suppliers or licensors be liable to any person for (a): any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use or content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if Leadler Technologies Private Limited has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of Leadler Technologies Private Limited and its affiliates, officers, employees, agents, suppliers and licensors, relating to the services will be limited to an amount greater of one dollar or any amounts actually paid in cash by you to Leadler Technologies Private Limited for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.</p>

        <h2>Indemnification</h2>

        <p>You agree to indemnify and hold Leadler Technologies Private Limited and its affiliates, directors, officers, employees, and agents harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys' fees, incurred in connection with or arising from any third-party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Application or Services or any willful misconduct on your part.</p>

        <h2>Severability</h2>

        <p>All rights and restrictions contained in this Agreement may be exercised and shall be applicable and binding only to the extent that they do not violate any applicable laws and are intended to be limited to the extent necessary so that they will not render this Agreement illegal, invalid or unenforceable. If any provision or portion of any provision of this Agreement shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, it is the intention of the parties that the remaining provisions or portions thereof shall constitute their agreement with respect to the subject matter hereof, and all such remaining provisions or portions thereof shall remain in full force and effect.</p>

        <h2>Dispute resolution</h2>

        <p>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of Kerala, India without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of India. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the state and federal courts located in Kerala, India, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</p>

        <h2>Assignment</h2>

        <p>You may not assign, resell, sub-license or otherwise transfer or delegate any of your rights or obligations hereunder, in whole or in part, without our prior written consent, which consent shall be at our own sole discretion and without obligation; any such assignment or transfer shall be null and void. We are is free to assign any of its rights or obligations hereunder, in whole or in part, to any third-party as part of the sale of all or substantially all of its assets or stock or as part of a merger.</p>

        <h2>Changes and amendments</h2>

        <p>We reserve the right to modify this Agreement or its policies relating to the Application or Services at any time, effective upon posting of an updated version of this Agreement in the Application. When we do we will revise the updated date at the bottom of this page. Continued use of the Application after any such changes shall constitute your consent to such changes.</p>

        <h2>Acceptance of these terms</h2>

        <p>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By using the Application or its Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to use or access the Application and its Services.</p>

        <h2>Contacting us</h2>

        <p>If you have any questions about this Agreement, please contact us.</p>

        <p>This document was last updated on June 26, 2018</p>
      </div>
    </modal>
  </div>
</template>

<script>
import MatInputBox from "./components/InputBoxMaterial.vue"
import axios from 'axios'
function initialState(){
      return {
        showPassLengthExclaimIcon:false,
        secondButtonMessage: "Reset Password",
        repeatPasswordError : false,
        showPassExclaimIcon:false,
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
        postUrl:"https://api.shopnitt.com",
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
    }
export default {
  name: 'app',
  components: {
    'mat-input' : MatInputBox
  },
    data: function (){
        return initialState();
    },
    methods: {
      reset: function (){
        Object.assign(this.$data,initialState())
      },
      show(){
        this.$modal.show("tos");
      },
      showPrivacy(){
        this.$modal.show("privacyPolicy");
      },
      verifyPasswordLength(){
        if (this.newPassword.length < 6) {
          this.showPassLengthExclaimIcon = true
          this.firstBoxError = true
          this.firstBoxMessage = "Password must be at least 6 characters"
        } else {
          this.showPassLengthExclaimIcon = false
          this.firstBoxError = false
        }
      },
      verifyPasswords(){
        if (this.newPassword != this.repeatPassword) {
          this.showPassExclaimIcon = true
          this.repeatPasswordError = true
          this.secondBoxMessage = "Passwords do not match"
        }else{
          this.repeatPasswordError = false
          this.secondBoxMessage = ""
          this.showPassExclaimIcon = false
        }
      },
      postPassword(){
        const ctx = this
        if (ctx.passChanged){
          ctx.reset()
        }
        else if (this.newPassword == this.repeatPassword && this.newPassword.length >= 6 && this.repeatPassword.length >= 6) {
          this.spinnerActive = true
          axios.post(this.postUrl+"/shop/password/reset", { "contact-no": this.mobileNumber, "otp":parseInt(this.otpValue),"new-password":this.newPassword})
          .then(function(response){
            if (response.data.success == true){
              ctx.secondBoxMessage = "Your password was reset"
              ctx.showThirdBoxAndIcon = true
              ctx.passChanged = true
              ctx.secondButtonMessage="Done"
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
          if (response.data.success == true) {
          ctx.mainButtonState=2
          ctx.mobAndOtpPage = false
          ctx.secondBoxMessage = ""
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
  padding-top: 40px;
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
.secondSuccessDiv, .secondPageSecondErrorDiv{
    margin-left: 33px;
    margin-top: 108px;
    position: absolute;
    font-size: 14px;
} 
.secondSuccessDiv{
    color: #00C853;
}
.secondPageSecondErrorDiv{
  color: red;
  margin-left: 0;
}
.secondSuccessIcon{
    margin-top: 107px;
    position: absolute;
    color: #00C853;
}

.ButtonDisabled, .resetSuccess {
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
.resetSuccess{
  cursor: pointer;
  background-color: #00C853;
}

.ButtonEnabled{
  width: 180px;
  border-radius: 5px;
  padding: 15px;
  color: white;
  background-color: #2979FF;
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
  background-color: #2979FF;
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
    .exclaim, .exclaim-repeat, .OtpExclaim {
      pointer-events: none;
      color:red;
      margin-left: 273px;
      position: absolute;
      z-index: 100;
    }
    .exclaim{
      margin-top: 9px;
    }
    .exclaim-repeat{
      margin-top: 74px;
    }
    .OtpExclaim{
    margin-top: 72px;
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
    .tosStyle{
      cursor: pointer;
    }
    .tosStyle:hover{
      text-decoration: underline;
    }
    .tosContent {
      text-rendering: optimizeLegibility;
    text-align: justify;
    padding: 45px;
    }
</style>

