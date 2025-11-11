

// see https://www.jeffryhouser.com/index.cfm/2019/1/22/How-to-access-a-Constant-in-an-Angular-View-Template
// is it worth the refactoring?

 

// BOOLEAN_OPTIONS ?? follwing guidelines

// techical debt public vs authenicated contants?

// public 

export const BOOLEAN_OPTIONS_YN = [{ // only

  value: false,
  label: 'No'
}, {
  value: true,
  label: 'Yes'
}];

export const BOOLEAN_OPTIONS = [{
  value: null,
  label: 'Choose...'
}, {
  value: false,
  label: 'No'
}, {
  value: true,
  label: 'Yes'
}];

export const BOOLEAN_OPTIONS_BINARY = [{
  value: '',
  label: 'Choose...'
}, {
  value: 0,
  label: 'No'
}, {
  value: 1,
  label: 'Yes'
}];

// technical debit refactor public vs admin some in ECT3CurrentService

export const EMAILS_DIFFERENT = "Email verification issue";
export const UNSAVED_CHANGES = "Unsaved changes will be lost"; // used by alert dialog when form is dirty and routing away

// passwords are for admin users while not authenicated
export const PASSWORD_CONSTRAINTS = "Strong => 8 characters,min 1 uppercase, min 1 lowercase, min 1 digit and one special character"
export const PASSWORD_MISMATCH = "Passwords don't match, please correct"
export const PASSWORD_REQUIRED = "Password is required"
export const PASSWORD_CONFIRMATION_REQUIRED = "Confirmation required"
export const SUBMIT_DISABLED = "Submit disabled Draft/Preview"


export const BLOCKING_FULL_SCREEN_DIALOG_OPTIONS = {
  // minWidth: '96%',    // blockingFullScreenDialogOptions 20240626 changed this, now centres
  // minHeight: '96%', 
  // height: '96%', // otherwise some admin type dialogs collapse to meet the data
  // width: '96%',

  height: '100vh',
  width: '100vw',
  maxWidth: '100vw',
  disableClose: true
}



// STRING VERSIONS NEEDED TO SAVE TO DATABASE ETC and need a \ before normal pattern to behave

export const NOT_EMPTY_PATTERN = /^(?!\s*$).+/;
export const NOT_EMPTY_PATTERN_STR = '^(?!\\s*$).+';

//   \- needed in next before the -
export const EMAIL_PATTERN = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]+)*(\+[a-zA-Z0-9\-]+)?@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+){1,}$/i; // allows or xxx+ignore@gmail.com
export const EMAIL_PATTERN_STR = '^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*(\\+[a-zA-Z0-9-]+)?@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+){1,}$'; // allows or xxx+ignore@gmail.com

// 20250507 multiple email address separated by ; 
// allows or xxx+ignore@gmail.com  ;    xxx+ignore@gmail.com    i.e. spaced
export const EMAIL_PATTERN_N = /(\s*[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]+)*(\+[a-zA-Z0-9\-]+)?@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+){1,}\s*;*){1,}/i; // 
export const EMAIL_PATTERN_N_STR = '(\\s*[_a-zA-Z0-9\-]+(\\.[_a-zA-Z0-9\-]+)*(\\+[a-zA-Z0-9\\-]+)?@[a-zA-Z0-9\-]+(\\.[a-zA-Z0-9\\-]+){1,}\\s*;*){1,}'; // allows or xxx+ignore@gmail.com

export const TELEPHONE_PATTERN = /^[\+]*[\(]{0,1}[0-9]{1,4}[\)]{0,1}[\-\s\.\/0-9]*$/; // crashing the regex added to -    \- and \\-
export const TELEPHONE_PATTERN_STR = '^[\+]*[\(]{0,1}[0-9]{1,4}[\)]{0,1}[\\-\\s\\.\\/0-9]*$';
// export const TELEPHONE_PATTERN  = "^\s*\(?\s*\d{1,4}\s*\)?\s*[\d\s]{5,10}\s*$"; 

// or [email]="true" directive on the input
//                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const CURRENCY_PATTERN = /^[1-9]([0-9]{0,5})?(\.[0-9]{2})?$/;   // must start with a 1..9 POSITVE
export const CURRENCY_PATTERN_WITHZERO = /^[0-9]([0-9]{0,5})?(\.[0-9]{2})?$/;  // allows 0 and 0.00
export const CURRENCY_PATTERN_MIN_01_CENT = /^(?=.*[1-9])(0|[1-9]([0-9]{0,5})?)(\.[0-9]{2})?$/;  // >= 0.01 && <= 999999.99 allows 0.xx  but not 0 or 0.00

//export const CURRENCY_PATTERN = '^[0-9]+(\.[0-9]{1,2})?$';
export const INTEGER_POSITIVE_PATTERN = /^[1-9]+[0-9]*$/; // ^[1-9]+\d*$ refused multiples of 10
export const INTEGER_POSITIVE_PATTERN_STR = '^[1-9]+[0-9]*$'; // ^[1-9]+\d*$ refused multiples of 10

// these appear to be better
export const DECIMAL_2_PATTERN = /^\d+\.\d{2}$/  // 0.00
export const DECIMAL_2_PATTERN_STR = '^\\d+\\.\\d{2}$';

// either valid code or null/ empty string  nb ^$ | at start to catch empty string DOES NOT LIKE SPACES with |
// used by a validator
export const HEX_COLOUR_OR_EMPTY_PATTERN = /^$|^#([A-F0-9]{3}){1,2}$|^red$|^white$|^black$|^blue$|^green$|^yellow$|^orange$/i;

export const TIME24_PATTERN = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
export const TIME24_PATTERN_STR = '^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$';

export const TIME12_AM_PM_PATTERN = /^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$/
export const TIME12_AM_PM_PATTERN_STR = '^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$';

export const STATIC_NAME_PATTERN_STR = "^([A-Za-z]+[0-9]*[ \-\_0-9]*)+[A-Za-z0-9]+$|^[A-Za-z]+$"; // static name, single spaces and - || _ only terminating numbers

export const RANGE_1_10_PATTERN_STR = "^[1-9]{1}$|^10$";

export const RANGE_MINUS_1_10_PATTERN = /(^-1$)|^[1-9]{1}$|^10$/; // tested
export const RANGE_MINUS_1_10_PATTERN_STR = "(^-1$)|^[1-9]{1}$|^10$"; // tested

export const RANGE_1_99_PATTERN_STR = "^(0?[1-9]|[1-9][0-9])$";


// comma separated, prevent leading , and trailing , but allow spaces in terms between commma
export const COMMA_SEPARATED_PHRASES = /^(\w+( +\w+)*,* *)+( *\w+( +\w+)*)$/ // passes: region 1, region 2, region 3 and single case??
export const COMMA_SEPARATED_PHRASES_STR = "^(\w+( +\w+)*,* *)+( *\w+( +\w+)*)$"

export const WORD_REQUIRED = /.*\w.*/