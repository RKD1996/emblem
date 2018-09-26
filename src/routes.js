import homepage from './components/HomePage.vue';
import signup from './components/access/Signup.vue';
import signin from './components/access/Signin.vue';
import forgot from './components/access/Forgot.vue';
import human from './components/captcha/Human.vue';
import pin from './components/setup/FourDigitPin.vue';
import energysetup from './components/setup/EnergySetup.vue';
import tariffimport from './components/setup/TariffImport.vue';
import tariffexport from './components/setup/TariffExport.vue';
import nearlythere from './components/setup/NearlyThere.vue';
import buyingparams from './components/setup/BuyingParameters.vue';
import sellingparams from './components/setup/SellingParameters.vue';
import alldone from './components/setup/AllDone.vue';
import test from './components/setup/Test.vue';
import sessionexpire from './components/setup/SessionExpire.vue';

import settings from './components/settings/Settings.vue';
import account from './components/settings/Account.vue';
import changeemail from './components/settings/ChangeEmail.vue';
import changepassword from './components/settings/ChangePassword.vue';
import energyparameter from './components/settings/EnergyParameter.vue';
import tariff from './components/settings/Tariff.vue';

import savings from './components/savings/Saved.vue';
import maxprice from './components/savings/MaxPriceSetting.vue';
import infodisplay from './components/savings/DisplayInfoPage.vue';
import sales from './components/sales/sales.vue';
import trading from './components/sales/TradingPriceSetting.vue';
// import generate from './components/sales/GeneratePriceSetting.vue';
import exportPrice from './components/sales/ExportPriceSetting.vue';
import salesinfo from './components/sales/DisplaySalesInfo.vue';

import energy from './components/energy/Energy.vue';
import energyinfo from './components/energy/DisplayInfo.vue';
import carbon from './components/carbon/Carbon.vue';
import carboninfo from './components/carbon/DisplayCarbonInfo.vue';

import energytariffs from './components/tariffs/EnergyTariffs.vue';
import importstandardflatrate from './components/tariffs/import/StandardFlatRate.vue';
import importdaynighttariff from './components/tariffs/import/DayNightTariff.vue';
import exportstandardflatrate from './components/tariffs/export/StandardFlatRate.vue';
import basicblock from './components/tariffs/BasicBlock.vue';
import timeofuse from './components/tariffs/TimeofUse.vue';
import newblock from './components/tariffs/NewBlock.vue';

export default [
  {path: '/', component: homepage},
  {path: '/signup', component: signup},
  {path: '/signin', component: signin},
  {path: '/forgot', component: forgot},
  {path: '/human', component: human},
  {path: '/pin', component: pin},
  {path: '/energysetup', component: energysetup},
  {path: '/tariffimport', component: tariffimport},
  {path: '/tariffexport', component: tariffexport},
  {path: '/nearlythere', component: nearlythere},
  {path: '/buyingparams', component: buyingparams},
  {path: '/sellingparams', component: sellingparams},
  {path: '/alldone', component: alldone},
  {path: '/test', component: test},
  {path: '/sessionexpire', component: sessionexpire},

  { path: '/settings', component: settings},
  { path: '/settings/account', component: account},
  { path: '/settings/change/email', component: changeemail},
  { path: '/settings/change/password', component: changepassword},
  { path: '/energyparameter', component: energyparameter},
  { path: '/tariff', component: tariff},

  { path: '/energytariffs', component: energytariffs},
  { path: '/tariffs/standardflatrate', component: importstandardflatrate},
  { path: '/tariffs/daynighttariff', component: importdaynighttariff},
  { path: '/tariffs/standardrate', component: exportstandardflatrate},
  { path: '/tariffs/basicblock', component: basicblock},
  { path: '/tariffs/timeofuse', component: timeofuse},
  { path: '/tariffs/newblock', component: newblock},

  { path: '/savings', component: savings},
  { path: '/savings/maxprice', component: maxprice},
  { path: '/savings/info', component: infodisplay},
  { path: '/sales', component: sales},
  // { path: '/sales/generate', component: generate},
  { path: '/sales/trading', component: trading},
  { path: '/sales/export', component: exportPrice},
  { path: '/sales/sales_info', component: salesinfo},
  { path: '/energy', component: energy},
  { path: '/energy/info', component: energyinfo},
  { path: '/carbon', component: carbon},
  { path: '/carbon/info', component: carboninfo}

]
