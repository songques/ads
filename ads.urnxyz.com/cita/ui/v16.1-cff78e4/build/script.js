functionconfig(t,
e){
	t.when("/",
	{
		templateUrl: "templates/cita.html"
	}),
	t.when("/help",
	{
		templateUrl: "templates/help.html"
	}),
	t.when("/error/:errorCode",
	{
		templateUrl: "templates/error.html"
	}),
	t.otherwise({
		redirectTo: "/"
	}),
	e.useLoader("messagesService").registerAvailableLanguageKeys(["en",
	"de"],
	{
		de_AT: "de",
		de_BE: "de",
		de_CH: "de",
		de_DE: "de",
		de_LI: "de",
		de_LU: "de"
	}).useSanitizeValueStrategy("sanitizeParameters")
}functionappRun(t,
e,
i,
n,
o,
s,
r,
a){
	varc=null;i.setLanguage(c),
	t.all({
		init: i.load(),
		messages: n()
	}).then(function(){
		vart=i.displaySettings.natcoName,
		n=i.displaySettings.wholesalePartnerId,
		c=i.displaySettings.customCss;t&&c&&(angular.element(document.querySelector("head")).append(e('<linkrel="stylesheet"href="natco/'+t+"/"+c+'"type="text/css">')({
			
		})),
		angular.element(document.querySelector("head")).append(e('<linkrel="shortcut icon"href="natco/'+t+"/favicon-"+n+'.ico"type="image/x-icon">')({
			
		}))),
		o.use(i.displaySettings.language).then(function(){
			r.document.title=a("translate")(i.displaySettings.isAnonymous?"PageTitleAnonymous": "PageTitle")
		}),
		s.deferred.resolve(),
		self===top?angular.element(document.querySelector("#bodymain")).css("display",
		"inherit"): top.location=self.location
	},
	function(){
		o.use(i.displaySettings.language)
	})
}functionErrorController(t,
e,
i,
n,
o,
s){
	functionr(){
		"REDIRECT"==i.getCode()&&t.cancel()
	}functiona(n,
	o,
	s){
		o().then(function(){
			i.pending=!1,
			e.url("/?sessionId="+e.search().sessionId+"&refurl="+encodeURIComponent(e.search().refurl))
		},
		function(o){
			i.pending=!1,
			o&&o.data&&o.data.code&&o.data.code==n||(o&&o.data&&o.data.code&&null!=s&&s.indexOf(o.data.code)>=0?e.url("/?sessionId="+e.search().sessionId+"&refurl="+encodeURIComponent(e.search().refurl)): t.cancel())
		})
	}t.errorService=i,
	t.refurlExists=e.search().refurl?!0: !1,
	t.retry=function(){
		if(!i.pending)switch(i.pending=!0,
		i.getCode()){
			case"INIT_RETRY": a(i.getCode(),
			n.retry);break;case"TAN_RETRY": a(i.getCode(),
			o.requestNew);break;case"IDENTIFICATION_RETRY": a(i.getCode(),
			o.retry);break;case"CONFIRM_RETRY": a(i.getCode(),
			s.isValid,
			["TAN_ERROR"])
		}
	},
	r()
}functionHelpController(t,
e,
i,
n,
o){
	functions(){
		varn=e("../../citaservices/help");n.save({
			sessionId: i.search().sessionId
		},
		function(e){
			t.address=e.address,
			$("#help-address").show()
		},
		function(t){
			
		})
	}s(),
	t.isTranslated=function(t){
		return0==o.isMessagesResolved?!1: !("undefined"==typeofo.messagesMap[t]||""==o.messagesMap[t])
	}
}functionMasterController(t,
e,
i,
n,
o,
s,
r){
	functiona(){
		n.deferred.promise.then(function(){
			t.productService=o
		})
	}t.$location=s,
	t.sessionId=s.search().sessionId,
	t.refurl=s.search().refurl,
	t.initService=r,
	t.cancel=function(){
		e.location.href="/cita/redirect/?sessionId="+s.search().sessionId+"&refurl="+encodeURIComponent(s.search().refurl)
	},
	a()
}functionconfirmService(t,
e,
i,
n){
	functiono(t){
		for(vareint)l[e]=t[e]
	}functions(o){
		o!==!1&&(o=!0);vars=t.defer(),
		r=e("../../citaservices/confirm");returnr.save({
			value: l.value,
			accept: o,
			sessionId: i.search().sessionId,
			csrf: l.csrf
		},
		function(){
			n.location.href="/cita/redirect/?sessionId="+i.search().sessionId+"&refurl="+encodeURIComponent(i.search().refurl)
		},
		function(t){
			if(!(t&&t.data&&t.data.code))throw{
				code: "REDIRECT"
			};switch(t.data.code){
				case"TAN_ERROR": case"CAPTCHA_ERROR": returnl.value=null,
				l.error=!0,
				voids.reject(t);default: throws.reject(t),
				{
					code: t.data.code
				}
			}
		}),
		s.promise
	}functionr(){
		returnl.captchaImage?!0: !1
	}functiona(){
		varn=t.defer(),
		o=e("../../citaservices/newcaptcha");returno.save({
			sessionId: i.search().sessionId
		},
		function(t){
			l.captchaImage=t.captchaImage,
			l.value="",
			l.error=!1,
			n.resolve()
		},
		function(t){
			throw{
				code: t&&t.data&&t.data.code||"UNKNOWN"
			}
		}),
		n.promise
	}functionc(){
		null!=l.formLink&&l.formLink.$setPristine()
	}varl={
		closed: !0,
		number: 3,
		value: null,
		pending: !1,
		error: !1,
		valid: !1,
		otp: null,
		xtc: null,
		captchaImage: null,
		csrf: null,
		limitReached: !1,
		formLink: null,
		setFormPristine: c,
		init: o,
		isValid: s,
		hasCaptcha: r,
		requestNewCaptcha: a
	};returnl
}functionerrorService(t){
	functione(t){
		o.code=t
	}functioni(){
		return/_RETRY$/.test(o.getCode())
	}functionn(){
		returno.code?o.code: o.code=t.errorCode
	}varo={
		code: null,
		pending: !1,
		setError: e,
		getCode: n,
		isRetry: i
	};returno
}functioninitService(t,
e,
i,
n,
o,
s,
r){
	functiona(t){
		u.displaySettings.language=t||u.displaySettings.language
	}functionc(){
		returnu.displaySettings.language
	}functionl(t){
		u.displaySettings=t.displaySettings,
		n.init(t.product),
		o.init(t.dialogues.msisdn),
		s.init(t.dialogues.tan),
		r.init(t.dialogues.confirm)
	}functiond(){
		varn=i.defer(),
		o=t("../../citaservices/initretry");returno.save({
			sessionId: e.search().sessionId
		},
		function(t){
			l(t),
			n.resolve()
		},
		function(t){
			n.reject(t)
		}),
		n.promise
	}functionh(){
		varn=i.defer();if("/error/"==e.path().substr(0,
		7))returnn.resolve(),
		n.promise;varo=t("../../citaservices/init");returno.save({
			sessionId: e.search().sessionId,
			lang: c()
		},
		function(t){
			l(t),
			n.resolve()
		},
		function(t){
			thrown.reject(),
			t&&t.data&&t.data.code?{
				code: t.data.code
			}: {
				code: "UNKNOWN"
			}
		}),
		n.promise
	}varu={
		isMessagesResolved: !1,
		messagesMap: null,
		product: null,
		displaySettings: {
			language: "de",
			OTPLength: 1
		},
		load: h,
		retry: d,
		setLanguage: a,
		getLanguage: c
	};returnu
}functionmessagesService(t,
e,
i){
	returnfunction(){
		varn=t.defer(),
		o=n.promise;if(i.messagesMap)n.resolve(i.messagesMap);else{
			vars=e("../../citaservices/messages");s.save({
				wpid: null,
				lang: i.getLanguage()
			},
			function(t){
				n.resolve(i.messagesMap=t.messages),
				i.isMessagesResolved=!0
			},
			function(t){
				n.reject(t)
			})
		}returno
	}
}functionmsisdnService(t,
e,
i){
	functionn(t){
		for(vareint)s[e]=t[e]
	}functiono(){
		varn=t.defer(),
		o=e("../../citaservices/msisdn");returno.save({
			msisdn: s.value,
			sessionId: i.search().sessionId
		},
		function(){
			s.error=!1,
			s.valid=!0,
			n.resolve(!0)
		},
		function(t){
			if(t&&t.data&&t.data.code){
				switch(t.data.code){
					case"MSISDN_FORMAT_ERROR": case"MSISDN_AREA_CODE_ERROR": returns.errorMessage=t.data.code,
					s.error=!0,
					voidn.resolve(!1);case"TAN_RETRY": throws.error=!1,
					s.valid=!0,
					n.resolve(!0),
					{
						code: t.data.code
					}
				}throw{
					code: "REDIRECT"
				}
			}throw{
				code: "REDIRECT"
			}
		}),
		n.promise
	}vars={
		closed: !0,
		value: null,
		pending: !1,
		valid: !1,
		locked: !1,
		error: !1,
		errorMessage: null,
		init: n,
		isValid: o
	};returns
}functionproductService(t){
	functione(t){
		for(vareint)i[e]=t[e];i.price.content&&i.deferred.resolve()
	}vari={
		partner: null,
		price: null,
		init: e,
		deferred: t.defer()
	};returni
}functiontanService(t,
e,
i,
n,
o,
s){
	functionr(t){
		for(vareint)d[e]=t[e]
	}functiona(){
		varr=t.defer(),
		a=e("../../citaservices/tan");returna.save({
			tan: d.value,
			sessionId: i.search().sessionId
		},
		function(t){
			returnt.reload?n.location.reload(): (o.price=t.price,
			o.deferred.resolve(),
			s.captchaImage=t.captchaImage,
			d.error=!1,
			d.valid=!0,
			voidr.resolve(!0))
		},
		function(t){
			if(t&&t.data&&t.data.code){
				switch(t.data.code){
					case"TAN_RETRY": throwr.reject(t),
					{
						code: t.data.code
					};case"TAN_ERROR": returnd.errorMessage=t.data.code,
					d.error=!0,
					d.value=null,
					voidr.resolve(!1);case"IDENTIFICATION_RETRY": d.error=!1,
					d.valid=!0,
					r.resolve(!0);break;default: throw{
						code: "REDIRECT"
					}
				}throw{
					code: t.data.code
				}
			}throw{
				code: "REDIRECT"
			}
		}),
		r.promise
	}functionc(){
		varr=t.defer(),
		a=e("../../citaservices/identification");returna.save({
			sessionId: i.search().sessionId
		},
		function(t){
			returnt.reload?n.location.reload(): (o.price=t.price,
			o.deferred.resolve(),
			s.captchaImage=t.captchaImage,
			d.error=!1,
			d.valid=!0,
			voidr.resolve(!0))
		},
		function(t){
			r.reject(t)
		}),
		r.promise
	}functionl(){
		varn=t.defer(),
		o=e("../../citaservices/newtan");returno.save({
			sessionId: i.search().sessionId
		},
		function(){
			d.value="",
			s.value="",
			d.error=!1,
			n.resolve()
		},
		function(t){
			if(!(t&&t.data&&t.data.code&&-1!=["TAN_RESEND_LIMIT_REACHED"].indexOf(t.data.code)))thrown.reject(t),
			{
				code: t&&t.data&&t.data.code||"UNKNOWN"
			};d.error=!0,
			d.errorMessage=t.data.code,
			d.value="",
			s.value="",
			d.resendLimitReached=!0,
			n.resolve()
		}),
		n.promise
	}vard={
		closed: !0,
		value: null,
		visible: !1,
		pending: !1,
		error: !1,
		request: !1,
		resendLimitReached: !1,
		errorMessage: null,
		valid: !1,
		init: r,
		isValid: a,
		requestNew: l,
		retry: c
	};returnd
}functionconfirm(){
	return{
		restrict: "EA",
		templateUrl: "templates/confirm.html",
		controller: ConfirmController
	}
}functionConfirmController(t,
e,
i,
n,
o,
s,
r,
a){
	functionc(){
		i.deferred.promise.then(function(){
			s.number=o.visible?3: 2,
			0==s.closed&&s.hasCaptcha()&&e(function(){
				$("#captcha").focus()
			}),
			0==s.closed&&1==s.xtc&&e(function(){
				$("#otp").focus()
			})
		})
	}t.initService=n,
	t.tanService=o,
	t.confirmService=s,
	t.productService=r,
	c(),
	t.getType=function(){
		returns.hasCaptcha()?"ConfirmCaptcha": s.otp?s.xtc?"ConfirmXtcOtp": "ConfirmOtp": "Confirm"
	},
	t.requestNewCaptcha=function(t){
		s.pending||(s.pending=!0,
		s.requestNewCaptcha().then(function(){
			e(function(){
				$("#captcha").focus()
			}),
			s.pending=!1,
			null!=t&&t.$setPristine()
		}))
	},
	t.checkConfirm=function(e,
	i){
		returni&&e.$invalid?(o.error=!1,
		s.error=!0,
		!1): s.pending?!1: (s.pending=!0,
		s.isValid(i).then(function(){
			
		},
		function(e){
			s.pending=!1,
			e&&e.data&&e.data.code&&"CAPTCHA_ERROR"==e.data.code&&t.requestNewCaptcha()
		}),
		!1)
	},
	t.assignForm=function(t){
		s.formLink=t
	}
}functionfocusMe(t,
e){
	return{
		link: function(i,
		n,
		o){
			vars=e(o.focusMe);i.$watch(s,
			function(e){
				e===!0&&t(function(){
					n[0].focus()
				})
			}),
			n.bind("blur",
			function(){
				i.$apply(s.assign(i,
				!1))
			})
		}
	}
}functionmsisdn(){
	return{
		restrict: "EA",
		templateUrl: "templates/msisdn.html",
		controller: MsisdnController
	}
}functionMsisdnController(t,
e,
i,
n,
o,
s){
	functionr(){
		i.deferred.promise.then(function(){
			s.closed&&e(function(){
				$("#msisdn").focus()
			})
		})
	}t.msisdnService=n,
	r(),
	t.changeMsisdn=function(){
		n.valid=!1,
		o.closed=!0,
		o.valid=!1,
		o.value=null,
		o.errorMessage=null,
		o.error=!1,
		s.closed=!0,
		e(function(){
			$("#msisdn").focus()
		})
	},
	t.checkMsisdn=function(t){
		returnt.$invalid?(n.error=!0,
		!1): (n.value=n.value.replace(/+/,
		""),
		n.pending?!1: (n.pending=!0,
		n.isValid().then(function(i){
			i?(o.closed=!1,
			e(function(){
				o.request?$("#request_button").focus(): $("#tan").focus()
			})): t.$setPristine(),
			n.pending=!1
		}),
		!1))
	}
}functionprice(){
	return{
		restrict: "EA",
		transclude: !0,
		scope: {
			simple: "=?",
			footnote: "=?",
			prefix: "@",
			suffix: "@"
		},
		templateUrl: "templates/price.html",
		controller: PriceController
	}
}functionPriceController(t,
e,
i,
n,
o,
s){
	functionr(){
		t.contentFormatted=c,
		t.chargingCycle=a,
		n.all({
			product: s.deferred.promise,
			session: o.deferred.promise
		}).then(function(){
			t.productService=s
		})
	}functiona(t){
		returnt?e.footnote?i("translate")("FootnoteChargingCycle",
		{
			charging_cycle: l(t,
			!0,
			!1)
		}): i("translate")("ChargingCyclePer")+" "+l(t,
		!1,
		!0)+" "+i("translate")("ChargingCycleSubscription")+"<sup>1</sup>": void0
	}functionc(){
		returns&&s.price&&s.price.contentFormatted?s.price.contentFormatted.replace(/([0-9]{
			2
		})($|[^\d]+$)/,
		"<sup>$1</sup>$2"): ""
	}functionl(t,
	e,
	n){
		if(void0===t||null===t)returnt;(void0===e||null===e)&&(e=!1),
		(void0===n||null===n)&&(n=!1);varo=t.match(/\d+\w/g),
		s=[];for(varrino){
			vara=o[r].match(/\d+/),
			c=o[r].substr(-1,
			1);switch(c){
				case"M": c="Month";break;case"w": c="Week";break;case"d": c="Day";break;case"h": c="Hour";break;case"m": c="Minute";break;default: continue
			}1!=a&&(c+="Plural",
			e&&(c+="Dative")),
			n&&1==a&&1==o.length?s.push(i("translate")(c)): s.push(a+" "+i("translate")(c))
		}returns.length?s.join(", "): ""
	}r()
}functionstep(){
	return{
		restrict: "EA",
		transclude: !0,
		scope: {
			number: "@",
			title: "@",
			closed: "=?"
		},
		templateUrl: "templates/step.html"
	}
}functiontan(){
	return{
		restrict: "EA",
		templateUrl: "templates/tan.html",
		controller: TanController
	}
}functionTanController(t,
e,
i,
n,
o,
s){
	functionr(){
		i.deferred.promise.then(function(){
			o.request&&e(function(){
				$("#request_button").focus()
			})
		})
	}t.tanService=o,
	t.confirmService=s,
	r(),
	t.requestNew=function(t){
		o.pending||(o.pending=!0,
		o.requestNew().then(function(){
			o.pending=!1,
			t.$setPristine()
		},
		function(){
			o.pending=!1
		}))
	},
	t.requestOtp=function(){
		o.pending||(o.pending=!0,
		o.requestNew().then(function(){
			s.closed=!1,
			s.setFormPristine(),
			o.pending=!1,
			e(function(){
				$("#otp").focus()
			})
		},
		function(){
			o.pending=!1
		}))
	},
	t.checkTan=function(t){
		returnt.$invalid?(o.error=!0,
		!1): (o.value=o.value.replace(/+/,
		""),
		o.pending?!1: (o.pending=!0,
		o.isValid().then(function(i){
			i?(n.locked=!0,
			t.$setPristine(),
			s.closed=!1,
			e(function(){
				$("#captcha").focus()
			})): t.$setPristine(),
			o.pending=!1
		}),
		!1))
	}
}functionvalidateMinlength(){
	return{
		require: "ngModel",
		link: function(t,
		e,
		i,
		n){
			varo=0,
			s=function(t){
				vare=n.$isEmpty(t)||t.length>=o;returnn.$setValidity("minlength",
				e),
				e?t: void0
			};i.$observe("validateMinlength",
			function(t){
				o=parseInt(t,
				10),
				s(n.$viewValue)
			}),
			n.$parsers.push(s),
			n.$formatters.push(s)
		}
	}
}if(config.$inject=["$routeProvider",
"$translateProvider"],
appRun.$inject=["$q",
"$compile",
"initService",
"messagesService",
"$translate",
"sessionData",
"$window",
"$filter"],
ErrorController.$inject=["$scope",
"$location",
"errorService",
"initService",
"tanService",
"confirmService"],
HelpController.$inject=["$scope",
"$resource",
"$location",
"$translate",
"initService"],
MasterController.$inject=["$scope",
"$window",
"$translate",
"sessionData",
"productService",
"$location",
"initService"],
confirmService.$inject=["$q",
"$resource",
"$location",
"$window"],
errorService.$inject=["$routeParams"],
initService.$inject=["$resource",
"$location",
"$q",
"productService",
"msisdnService",
"tanService",
"confirmService"],
messagesService.$inject=["$q",
"$resource",
"initService"],
msisdnService.$inject=["$q",
"$resource",
"$location"],
productService.$inject=["$q"],
tanService.$inject=["$q",
"$resource",
"$location",
"$window",
"productService",
"confirmService"],
ConfirmController.$inject=["$scope",
"$timeout",
"sessionData",
"initService",
"tanService",
"confirmService",
"productService",
"$filter"],
focusMe.$inject=["$timeout",
"$parse"],
MsisdnController.$inject=["$scope",
"$timeout",
"sessionData",
"msisdnService",
"tanService",
"confirmService"],
PriceController.$inject=["$scope",
"$attrs",
"$filter",
"$q",
"sessionData",
"productService"],
TanController.$inject=["$scope",
"$timeout",
"sessionData",
"msisdnService",
"tanService",
"confirmService"],
angular.module("citaApp",
["ngRoute",
"pascalprecht.translate",
"ngSanitize",
"ngAria",
"citaApp.templates",
"citaApp.services",
"citaApp.directives",
"citaApp.filters",
"citaApp.controllers",
"ui.bootstrap",
"ngAnimate"]).config(config).run(appRun),
angular.module("citaApp.controllers",
[]),
angular.module("citaApp.services",
["ngResource"]).service("sessionData",
["$q",
function(t){
	return{
		sessionId: null,
		deferred: t.defer()
	}
}]).factory("missingTranslationHandler",
["$log",
"$translate",
function(t,
e){
	returnfunction(t){
		returnnull
	}
}]).factory("$exceptionHandler",
["$log",
"$injector",
"errorService",
function(t,
e,
i){
	varn=null;returnfunction(o){
		t.error(o),
		n=n||e.get("$location"),
		angular.element(document.querySelector("#bodymain")).css("display",
		"inherit");vars="UNEXPECTED";o&&o.code&&(s=o.code,
		i.setError(o.code),
		n.path("/error/"+s))
	}
}]),
angular.module("citaApp.directives",
[]),
angular.module("citaApp.filters",
[]).filter("i18n",
["$filter",
function(t){
	returnt("translate")
}]),
"undefined"==typeofjQuery)thrownewError("jQuery is required");+function(){
	for(vart=0,
	e=["ms",
	"moz",
	"webkit",
	"o"],
	i=0;i<e.length&&!window.requestAnimationFrame;++i)window.requestAnimationFrame=window[e[i]+"RequestAnimationFrame"],
	window.cancelAnimationFrame=window[e[i]+"CancelAnimationFrame"]||window[e[i]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,
	i){
		varn=(newDate).getTime(),
		o=Math.max(0,
		16-(n-t)),
		s=window.setTimeout(function(){
			e(n+o)
		},
		o);returnt=n+o,
		s
	}),
	window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){
		clearTimeout(t)
	})
}(window.jQuery),
+function(t){
	"use strict";vare=navigator.userAgent||navigator.vendor||window.opera,
	i=/iPhone|iPod|iPad|Silk|Android|BlackBerry|OperaMini|IEMobile/.test(e);t(function(){
		t.support.mobile=i
	})
}(window.jQuery),
+function(t){
	"use strict";functione(){
		vart=document.createElement("telekomcomponents"),
		e={
			WebkitTransition: "webkitTransitionEnd",
			MozTransition: "transitionend",
			OTransition: "oTransitionEnd otransitionend",
			transition: "transitionend"
		};for(variine)if(void0!==t.style[i])return{
			end: e[i]
		};return!1
	}t.fn.emulateTransitionEnd=function(e){
		vari=!1,
		n=this;t(this).one("tcTransitionEnd",
		function(){
			i=!0
		});varo=function(){
			i||t(n).trigger(t.support.transition.end)
		};returnsetTimeout(o,
		e),
		this
	},
	t(function(){
		t.support.transition=e(),
		t.support.transition&&(t.event.special.tcTransitionEnd={
			bindType: t.support.transition.end,
			delegateType: t.support.transition.end,
			handle: function(e){
				returnt(e.target).is(this)?e.handleObj.handler.apply(this,
				arguments): void0
			}
		})
	})
}(jQuery),
+function(t){
	"use strict";functione(e){
		returnthis.each(function(){
			vari=t(this),
			o=i.data("tc.radio"),
			s="object"==typeofe&&e;o||i.data("tc.radio",
			o=newn(this,
			s)),
			"string"==typeofe&&o[e]()
		})
	}vari=".form-radio-set",
	n=function(t,
	e){
		this.options=this.$element=null,
		this.init(t,
		e)
	};n.DEFAULTS={
		template: '<divtabindex="-1"class="form-radio-js"role="radio"autocomplete="off"hidefocus="true">&nbsp;<spanclass="border"></span><spanclass="check"></span></div>'
	},
	n.prototype.init=function(e,
	n){
		varo=this.$element=t(e);this.options=this.getOptions(n);vars=this.radio(),
		r=o.attr("name");if(o.before(s),
		o.addClass("hidden"),
		o.on("change.tc.radio",
		function(e){
			r&&t('input[name="'+r+'"]: radio: enabled').not(o).trigger("deselect.tc.radio"),
			s.addClass("checked").attr("aria-checked",
			"true").attr("tabindex",
			"0")
		}),
		o.on("deselect.tc.radio",
		function(t){
			s.removeClass("checked").attr("aria-checked",
			"false").attr("tabindex",
			"-1")
		}),
		s.parents(i).on("click.tc.radio",
		function(e){
			s.is(".disabled, :disabled")||t(e.target).hasClass("form-radio hidden")||o.trigger("click")
		}),
		s.on("keyup.tc.radio",
		function(t){
			s.is(":focus")&&s.addClass("focus")
		}),
		s.on("keydown.tc.radio",
		function(e){
			if(!r)return!0;if(e.altkey)return!0;vari=t('input[name="'+r+'"]: radio: enabled').index(o);switch(e.keyCode){
				case37: case38: returne.shiftKey?!0: (t('input[name="'+r+'"]: radio: enabled: eq('+(i-1)+")").trigger("click").prev().focus(),
				e.preventDefault(),
				e.stopPropagation(),
				!1);case39: case40: returne.shiftKey?!0: (t('input[name="'+r+'"]: radio: enabled: eq('+(i+1)+")").trigger("click").prev().focus(),
				e.preventDefault(),
				e.stopPropagation(),
				!1)
			}return!0
		}),
		s.on("keypress.tc.radio",
		function(t){
			returnt.altkey?!0: 37===t.keyCode||38===t.keyCode||39===t.keyCode||40===t.keyCode?(t.stopPropagation(),
			!1): !0
		}),
		s.on("blur.tc.radio",
		function(t){
			s.removeClass("focus")
		}),
		o.is(":checked")&&s.addClass("checked").attr("aria-checked",
		"true").attr("tabindex",
		"0"),
		(o.is(":disabled")||o.parents("fieldset").is(":disabled"))&&this.disable(),
		r){
			vara=t('input[name="'+r+'"]: radio: enabled'),
			c=a.filter(":checked");c.length<1&&(c=a.first()),
			a.each(function(e,
			i){
				varn=t(i),
				o=n.data("tc.radio");if(o){
					vars=o.radio();s.attr("tabindex",
					c[0]==i?"0": "-1")
				}
			})
		}
	},
	n.prototype.disable=function(){
		vart=this.$element,
		e=this.radio();e.attr("aria-disabled",
		!0).addClass("disabled"),
		t.parents(i).addClass("disabled")
	},
	n.prototype.enable=function(){
		vart=this.$element,
		e=this.radio();e.attr("aria-disabled",
		!1).removeClass("disabled"),
		t.parents(i).removeClass("disabled")
	},
	n.prototype.getDefaults=function(){
		returnn.DEFAULTS
	},
	n.prototype.getOptions=function(e){
		returne=t.extend({
			
		},
		this.getDefaults(),
		this.$element.data(),
		e)
	},
	n.prototype.radio=function(){
		returnthis.$radio=this.$radio||t(this.options.template)
	};varo=t.fn.radio;t.fn.radio=e,
	t.fn.radio.Constructor=n,
	t.fn.radio.noConflict=function(){
		returnt.fn.radio=o,
		this
	}
}(window.jQuery),
+function(t){
	"use strict";functione(e){
		returnthis.each(function(){
			vari=t(this),
			o=i.data("tc.checkbox"),
			s="object"==typeofe&&e;o||i.data("tc.checkbox",
			o=newn(this,
			s)),
			"string"==typeofe&&o[e]()
		})
	}vari=".form-checkbox-set",
	n=function(t,
	e){
		this.options=this.$element=null,
		this.init(t,
		e)
	};n.DEFAULTS={
		template: '<divtabindex="0"role="checkbox"class="form-checkbox-js"autocomplete="off"hidefocus="true">&nbsp;<spanclass="border"></span><spanclass="check"role="presentation"></span></div>'
	},
	n.prototype.init=function(e,
	n){
		varo=this.$element=t(e);this.options=this.getOptions(n);vars=this.checkbox();o.before(s),
		o.addClass("hidden"),
		o.on("change.tc.checkbox",
		function(t){
			o.is(":checked")?s.addClass("checked").attr("aria-checked",
			"true"): s.removeClass("checked").attr("aria-checked",
			"false")
		}),
		s.parents(i).on("click.tc.checkbox",
		function(e){
			returnt(e.target).hasClass("form-checkbox hidden")?!s.is(".disabled, :disabled"): (o.trigger("click"),
			s.is(".disabled, :disabled"))
		}),
		s.on("keyup.tc.checkbox",
		function(t){
			s.is(":focus")&&s.addClass("focus")
		}),
		s.on("keydown.tc.checkbox",
		function(t){
			returnt.altkey||t.ctrlKey||t.shiftKey?!0: 32==t.which?(s.trigger("click"),
			t.stopPropagation(),
			!1): !0
		}),
		s.on("keypress.tc.checkbox",
		function(t){
			returnt.altkey||t.ctrlKey||t.shiftKey?!0: 32==t.which?(t.stopPropagation(),
			!1): !0
		}),
		s.on("blur.tc.checkbox",
		function(t){
			s.removeClass("focus")
		}),
		o.is(":checked")&&s.addClass("checked").attr("aria-checked",
		"true"),
		o.attr("tabindex")&&s.attr("tabindex",
		o.attr("tabindex")),
		(o.is(":disabled")||o.parents("fieldset").is(":disabled"))&&this.disable()
	},
	n.prototype.disable=function(){
		vart=this.$element,
		e=this.checkbox();e.attr("aria-disabled",
		!0).attr("tabindex",
		"-1").addClass("disabled"),
		t.parents(i).addClass("disabled")
	},
	n.prototype.enable=function(){
		vart=this.$element,
		e=this.checkbox(),
		n="0";t.attr("tabindex")&&(n=t.attr("tabindex")),
		e.attr("aria-disabled",
		!1).attr("tabindex",
		n).removeClass("disabled"),
		t.parents(i).removeClass("disabled")
	},
	n.prototype.getDefaults=function(){
		returnn.DEFAULTS
	},
	n.prototype.getOptions=function(e){
		returne=t.extend({
			
		},
		this.getDefaults(),
		this.$element.data(),
		e)
	},
	n.prototype.checkbox=function(){
		returnthis.$checkbox=this.$checkbox||t(this.options.template)
	};varo=t.fn.checkbox;t.fn.checkbox=e,
	t.fn.checkbox.Constructor=n,
	t.fn.checkbox.noConflict=function(){
		returnt.fn.checkbox=o,
		this
	}
}(window.jQuery),
+function(t,
e){
	"use strict";functioni(e){
		returnthis.each(function(){
			vari=t(this),
			n=i.data("tc.selectbox"),
			s="object"==typeofe&&e;n||i.data("tc.selectbox",
			n=newo(this,
			s)),
			"string"==typeofe&&n[e]()
		})
	}varn=".form-radio-set",
	o=function(t,
	e){
		this.options=this.$element=null,
		this.init(t,
		e)
	};o.DEFAULTS={
		template: '<divclass="form-select-js"tabindex="-1"><inputtype="text"class="form-select-js-choice-input"role="combobox"aria-autocomplete="list"aria-readonly="true"tabindex="0"/><buttontype="button"class="form-select-js-choice"tabindex="-1"></button><divclass="form-select-js-option-scroll-wrapper"tabindex="-1"><ulclass="form-select-js-options"role="listbox"aria-expanded="true"></ul></div></div>',
		optionTemplate: "<li></li>",
		idPrefix: "select-",
		maxItems: 25
	},
	o.prototype.init=function(i,
	n){
		varo=this.$element=t(i);this.options=this.getOptions(n);vars=this.select(),
		r=this.scrollwrapper(),
		a=this.textinput(),
		c=this.choice(),
		l=t(document),
		d=this;if(o.is("select")&&!(o.is("[multiple]")||o.is("[size]")&&parseInt(o.attr("size"))>1)){
			if(this.setIds(),
			this.createOptions(),
			o.before(s),
			this.sync(),
			o.on("change",
			t.proxy(function(t){
				this.sync()
			},
			this)),
			o.is(":disabled")&&(s.attr("aria-disabled",
			!0),
			a.prop("disabled",
			!0)),
			t.support.mobile)returnthis.applyNativeBehaviour();o.addClass("hidden");varh=o.attr("id");if(h){
				varu=t('[for="'+h+'"]');u&&(u.attr("id")||u.attr("id",
				this.getId()+"-label"),
				a.attr("aria-labelledby",
				u.attr("id")))
			}varp=function(e){
				vari=t(e.target).parents(".form-select-js"),
				n=t(e.target).parents(".form-select-js-option-scroll-wrapper");if(i[0]!==s[0]&&n[0]!==r[0])returnd.hide(!1);varo=t(e.target).parent();if(o.hasClass("form-select-js-options")){
					vara=o.parent(),
					c=a.scrollTop(),
					l=e.originalEvent.wheelDelta?-1*e.originalEvent.wheelDelta: e.originalEvent.delta,
					h=(e.originalEvent.deltaY||-1*e.originalEvent.wheelDelta)>0?1: -1,
					u=o.height()-a.height();if(l){
						varp=Math.max(0,
						Math.min(c+l,
						u));a.scrollTop(p),
						e.stopImmediatePropagation(),
						e.preventDefault()
					}(0>=c&&-1===h||c>=u&&1===h)&&(e.stopImmediatePropagation(),
					e.preventDefault())
				}
			};l.on("click touchstart mousewheel wheel scroll",
			p),
			c.parents().on("mousewheel wheel scroll",
			p),
			t(e).on("resize mousewheel wheel scroll",
			p),
			c.on("click",
			t.proxy(this.toggle,
			this))
		}
	},
	o.prototype.setIds=function(){
		vart=this.getId();this.select().attr("id",
		t),
		this.optionlist().attr("id",
		t+"-list"),
		this.textinput().attr("aria-owns",
		t+"-list").attr("aria-labelledby",
		t+"-label")
	},
	o.prototype.applyNativeBehaviour=function(){
		vare=this.select(),
		i=this.choice(),
		n=e.position(),
		o={
			width: e.width(),
			height: e.height()
		};i.on("click",
		t.proxy(this.openNative,
		this)),
		this.$element.css({
			display: "block",
			visibility: "visible",
			position: "absolute",
			top: n.top,
			left: n.left,
			width: o.width,
			height: o.height,
			opacity: 0,
			"z-index": 99999,
			"-webkit-appearance": "menulist-button"
		})
	},
	o.prototype.openNative=function(){
		vart=this.$element;if(document.createEvent){
			vari=document.createEvent("MouseEvents");i.initMouseEvent("mousedown",
			!0,
			!0,
			e,
			0,
			0,
			0,
			0,
			0,
			!1,
			!1,
			!1,
			!1,
			0,
			null),
			t[0].dispatchEvent(i)
		}elset[0].fireEvent&&t[0].fireEvent("onmousedown")
	},
	o.prototype.sync=function(){
		vart=this.choice(),
		e=this.optionlist(),
		i=this.textinput();t.text(this.$element.find("option:selected").text());varn=e.find(".selected").attr("id");i.attr("aria-activedescendant",
		n)
	},
	o.prototype.hoverOption=function(t){
		"true"!==t.attr("aria-disabled")&&(t.siblings().removeClass("hover"),
		t.addClass("hover"))
	},
	o.prototype.selectOption=function(t){
		"true"!==t.attr("aria-disabled")&&(t.siblings().removeClass("selected"),
		t.addClass("selected"))
	},
	o.suppressMouseInteractionAfterViewUpdate=!1,
	o.prototype.setSelectedOption=function(t,
	e){
		vari=this.$element,
		n=this.optionlist(),
		s=n.children(),
		r=s.filter(".selected");(t!==r||e)&&(this.hoverOption(t),
		this.selectOption(t),
		i[0].selectedIndex=s.index(t),
		i.trigger("change"),
		this.updateScrollView(),
		o.suppressMouseInteractionAfterViewUpdate=!0)
	},
	o.prototype.hasOriginalOptions=function(){
		returnthis.getOriginalOptions().length>0
	},
	o.prototype.getOriginalOptions=function(){
		returnthis.$element.children()
	},
	o.prototype.createOptions=function(){
		vare=this,
		i=this.optionlist(),
		n=this.getOriginalOptions(),
		s=this.textinput(),
		r=this.getId(),
		a=0;i.empty(),
		n.each(function(){
			varn=t(this),
			o=[],
			s=n.is(":disabled");n.is(":selected")&&o.push("selected"),
			i.append(t(e.options.optionTemplate,
			{
				html: n.html(),
				"data-value": n.val(),
				"class": o.join(" "),
				role: "option",
				tabindex: "-1",
				id: r+"-option-"+++a,
				"aria-disabled": s
			}))
		});varc=i.find(".selected").attr("id");s.attr("aria-activedescendant",
		c),
		i.children().on("mouseenter.tc.selectbox.option.data-api",
		t.proxy(function(e){
			returne.preventDefault(),
			o.suppressMouseInteractionAfterViewUpdate?o.suppressMouseInteractionAfterViewUpdate=!1: voidthis.hoverOption(t(e.currentTarget))
		},
		this)).on("click.tc.selectbox.option.data-api",
		t.proxy(function(e){
			e.preventDefault(),
			t(e.currentTarget).is('[aria-disabled="true"]')||(this.setSelectedOption(t(e.currentTarget),
			!0),
			this.hide())
		},
		this))
	},
	o.prototype.getVisibleItemsNum=function(){
		vari=this.select(),
		n=this.scrollwrapper(),
		o=this.measureRowHeight(),
		s=Math.min(this.options.maxItems,
		n.find("li").length),
		r=Math.min(.5*(t(e).height()-i.outerHeight()),
		s*o),
		a=Math.floor(r/o);returnMath.max(1,
		a)
	},
	o.prototype.measureRowHeight=function(){
		vart=this.scrollwrapper();returnt.find("li:first").outerHeight()
	},
	o.prototype.measureScrollwrapperDimensions=function(){
		vart=this.choice(),
		e=this.optionlist(),
		i=this.measureRowHeight(),
		n=Math.max(i,
		Math.min(e.height(),
		this.getVisibleItemsNum()*i)),
		o=e.parent();return{
			"min-width": t.outerWidth(),
			height: n+Number(o.css("border-top-width").replace(/px/,
			""))+Number(o.css("border-bottom-width").replace(/px/,
			""))
		}
	},
	o.prototype.getCalculatedScrollwrapperOffset=function(){
		vari=this.choice(),
		n=this.measureScrollwrapperDimensions(),
		o={
			left: i.offset().left
		};returni.offset().top+i.outerHeight()-t(e).scrollTop()+n.height>t(e).height()?o.top=i.offset().top-t(e).scrollTop()-n.height-(i.outerHeight()-i.height()): o.top=i.offset().top+i.outerHeight()-t(e).scrollTop(),
		o
	},
	o.prototype.show=function(){
		vare=this.select(),
		i=this.textinput(),
		n=this.scrollwrapper(),
		o=this.optionlist();if(!this.isDisabled()&&this.hasOriginalOptions()){
			this.createOptions(),
			i.focus(),
			e.addClass("in"),
			o.attr("aria-expanded",
			"true");vars=this.measureScrollwrapperDimensions(),
			r=this.getCalculatedScrollwrapperOffset();t("body").append(n),
			n.css(s).css(r).css("display",
			"block"),
			this.updateScrollView()
		}
	},
	o.prototype.isOpened=function(){
		returnthis.select().hasClass("in")
	},
	o.prototype.hide=function(t){
		vare=this.select(),
		i=this.textinput(),
		n=this.scrollwrapper();if(!this.isDisabled()){
			e.hasClass("in")&&e.removeClass("in"),
			n.css("display",
			"");varo=this.optionlist();o.attr("aria-expanded",
			"false"),
			t!==!1&&i.focus()
		}
	},
	o.prototype.isDisabled=function(){
		return"true"===this.select().attr("aria-disabled")
	},
	o.prototype.disable=function(){
		vart=this.$element,
		e=this.select(),
		i=this.textinput();t.attr("aria-disabled",
		!0),
		e.attr("aria-disabled",
		!0),
		i.addClass("disabled"),
		t.parents(n).addClass("disabled")
	},
	o.prototype.enable=function(){
		vart=this.$element,
		e=this.select(),
		i=this.textinput();t.attr("aria-disabled",
		!1),
		e.attr("aria-disabled",
		!1),
		i.removeClass("disabled"),
		t.parents(n).removeClass("disabled")
	},
	o.prototype.toggle=function(){
		this.isDisabled()||(this.isOpened()?this.hide(): this.show())
	},
	o.prototype.getDefaults=function(){
		returno.DEFAULTS
	},
	o.prototype.getOptions=function(e){
		returne=t.extend({
			
		},
		this.getDefaults(),
		this.$element.data(),
		e)
	},
	o.instanceCounter=0,
	o.prototype.getId=function(){
		returnthis.id=this.id||this.options.idPrefix+++o.instanceCounter
	},
	o.prototype.scrollwrapper=function(){
		returnthis.$scrollwrapper=this.$scrollwrapper||this.select().find(".form-select-js-option-scroll-wrapper")
	},
	o.prototype.optionlist=function(){
		returnthis.$optionlist=this.$optionlist||this.select().find(".form-select-js-options")
	},
	o.prototype.choice=function(){
		returnthis.$choice=this.$choice||this.select().find(".form-select-js-choice")
	},
	o.prototype.textinput=function(){
		returnthis.$textinput=this.$textinput||this.select().find(".form-select-js-choice-input")
	},
	o.prototype.select=function(){
		returnthis.$select=this.$select||t(this.options.template)
	},
	o.prototype.keyboardHandler=function(e){
		vari=t(this),
		n=i.next(),
		s=n.data("tc.selectbox"),
		r=s.textinput(),
		a=s.scrollwrapper(),
		c=i.hasClass("in"),
		l=[13,
		27,
		33,
		34,
		35,
		36,
		37,
		38,
		39,
		40];if(9===e.keyCode)returns.hide();if(!s.isDisabled()){
			if(e.keyCode<32&&r.val(""),
			32===e.keyCode&&""===r.val())returne.preventDefault(),
			e.stopPropagation(),
			s.toggle();if(newRegExp("^("+l.join("|")+")$").test(e.keyCode)){
				if(e.preventDefault(),
				e.stopPropagation(),
				o.suppressMouseInteractionAfterViewUpdate=!0,
				13===e.keyCode||e.altKey&&(38===e.keyCode||40===e.keyCode))returns.toggle();if(27===e.keyCode)returns.hide();vard='li: not([aria-disabled="true"])',
				h=a.find(d);if(h.length){
					varu=h.index(h.filter(".selected"));if(-1===u){
						for(varp=a.find("li"),
						f=p.index(p.filter(".selected"));-1===u&&--f>=0;)u=h.index(p.eq(f));if(-1===u){
							f=p.index(p.filter(".selected"));for(varm=p.length;-1===u&&++f<m;)u=h.index(p.eq(f));u-=.5
						}elseu+=.5
					}if(33===e.keyCode||34===e.keyCode)if(s.isOpened()){
						for(varg=a.scrollTop(),
						v=g+a.height(),
						b=s.getVisibleItemsNum(),
						y=0;y<h.length&&g>h[y].offsetTop;)y++;for(varw=y;w<h.length&&h[w].offsetTop+h[w].offsetHeight<v;)w++;u=33===e.keyCode?Math.ceil(u!==y?y: u-b): u!==w?w: u+b
					}elseu+=3*(33===e.keyCode?-1: 1);varx=u;38===e.keyCode&&(u-=1),
					40===e.keyCode&&(u+=1),
					37!==e.keyCode||c||(u-=1),
					39!==e.keyCode||c||(u+=1),
					36===e.keyCode&&(u=0),
					35===e.keyCode&&(u=h.length-1),
					u=Math.max(0,
					Math.min(u,
					h.length-1)),
					~u||(u=0),
					u%1&&(u>x&&--u,
					u=Math.round(u)),
					s.setSelectedOption(h.eq(u))
				}
			}
		}
	},
	o.prototype.textInputChangeHandler=function(e){
		vari=t(this),
		n=i.next(),
		o=n.data("tc.selectbox"),
		s=o.textinput();clearTimeout(t.data(this,
		"tiClearTimer")),
		t.data(this,
		"tiClearTimer",
		setTimeout(function(){
			this.previousSearchText="",
			s.val("")
		},
		1e3));varr=String.fromCharCode(e.keyCode),
		a=(s.val().toString()+(r!==this.previousSearchText?r: "")).toLowerCase();if(""!==a){
			varc='li: not([aria-disabled="true"])',
			l=i.find(c);if(l.length){
				vard=l.index(l.filter(".selected")),
				h=-1;returna.length>1&&(h=o.findNextOptionByText(l,
				a,
				d-1)),
				-1!==h?o.setSelectedOption(l.eq(h)): r&&""!==r&&(h=o.findNextOptionByText(l,
				r,
				d),
				-1!==h)?o.setSelectedOption(l.eq(h)): void(this.previousSearchText=a)
			}
		}
	},
	o.prototype.findNextOptionByText=function(e,
	i,
	n){
		varo=i.toLowerCase();if(""===o)return-1;vars=-1,
		r=-1;returne.each(function(e){
			return0===t(this).text().toLowerCase().indexOf(o)&&(-1===s&&(s=e),
			-1===r&&e>n)?r=e: void0;
		}),
		Math.max(s,
		r)
	},
	o.prototype.focusHandler=function(e){
		vari=t(this).parent();"focusin"===e.type?i.addClass("focus"): i.removeClass("focus")
	},
	o.prototype.updateScrollView=function(){
		vart=this.optionlist(),
		e=t.find(".selected");if(e[0]){
			vari=this.scrollwrapper(),
			n=i.scrollTop(),
			o=this.measureScrollwrapperDimensions(),
			s=e[0].offsetTop,
			r=e[0].offsetHeight;n>s?i.scrollTop(s): n+o.height<s+r&&i.scrollTop(s+r-o.height)
		}
	};vars=t.fn.selectbox;t.fn.selectbox=i,
	t.fn.selectbox.Constructor=o,
	t.fn.selectbox.noConflict=function(){
		returnt.fn.selectbox=s,
		this
	},
	t(document).on("keydown.tc.selectbox.data-api",
	".form-select-js",
	o.prototype.keyboardHandler).on("keypress.tc.selectbox.data-api",
	".form-select-js",
	o.prototype.textInputChangeHandler).on("focusin.tc.selectbox.data-api",
	".form-select-js-choice-input",
	o.prototype.focusHandler).on("focusout.tc.selectbox.data-api",
	".form-select-js-choice-input",
	o.prototype.focusHandler)
}(window.jQuery,
window),
+function(t){
	"use strict";functione(e,
	n){
		returnthis.each(function(){
			varo=t(this),
			s=o.data("tc.modal"),
			r=t.extend({
				
			},
			i.DEFAULTS,
			o.data(),
			"object"==typeofe&&e);if(void0===o.attr("tabindex")&&o.attr("tabindex",
			-1),
			!s&&r.template&&0===o.find(".modal-content").length){
				vara=o.html();o.html(r.template).find(".modal-content").append(a)
			}s||o.data("tc.modal",
			s=newi(this,
			r)),
			"string"==typeofe?s[e](n): r.show&&s.show(n)
		})
	}vari=function(e,
	i){
		this.options=i,
		this.$body=t(document.body),
		this.$element=t(e),
		this.$backdrop=this.isShown=null,
		this.scrollbarWidth=0,
		this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,
		t.proxy(function(){
			this.$element.trigger("loaded.tc.modal")
		},
		this))
	};i.VERSION="1",
	i.TRANSITION_DURATION=300,
	i.BACKDROP_TRANSITION_DURATION=150,
	i.DEFAULTS={
		backdrop: !0,
		keyboard: !0,
		show: !0,
		template: '<divclass="modal-dialog"><divclass="modal-content"><buttontype="button"class="close"data-dismiss="modal"><spanaria-hidden="true">x</span><spanclass="sr-only">Close</span></button></div></div>'
	},
	i.prototype.toggle=function(t){
		returnthis.isShown?this.hide(): this.show(t)
	},
	i.prototype.show=function(e){
		varn=this,
		o=t.Event("show.tc.modal",
		{
			relatedTarget: e
		});this.$element.trigger(o),
		this.isShown||o.isDefaultPrevented()||(this.isShown=!0,
		this.checkScrollbar(),
		this.setScrollbar(),
		this.$body.addClass("modal-open"),
		this.escape(),
		this.resize(),
		this.$element.on("click.dismiss.tc.modal",
		'[data-dismiss="modal"]',
		t.proxy(this.hide,
		this)),
		this.backdrop(function(){
			varo=t.support.transition&&n.$element.hasClass("fade");n.$element.parent().length||n.$element.appendTo(n.$body),
			n.$element.show().scrollTop(0),
			n.options.backdrop&&n.adjustBackdrop(),
			n.adjustDialog(),
			o&&n.$element[0].offsetWidth,
			n.$element.addClass("in").attr("aria-hidden",
			!1),
			n.enforceFocus();vars=t.Event("shown.tc.modal",
			{
				relatedTarget: e
			});o?n.$element.find(".modal-dialog").one("tcTransitionEnd",
			function(){
				n.$element.trigger("focus").trigger(s)
			}).emulateTransitionEnd(i.TRANSITION_DURATION): n.$element.trigger("focus").trigger(s)
		}))
	},
	i.prototype.hide=function(e){
		e&&e.preventDefault(),
		e=t.Event("hide.tc.modal"),
		this.$element.trigger(e),
		this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,
		this.escape(),
		this.resize(),
		t(document).off("focusin.tc.modal"),
		this.$element.removeClass("in").attr("aria-hidden",
		!0).off("click.dismiss.tc.modal"),
		t.support.transition&&this.$element.hasClass("fade")?this.$element.one("tcTransitionEnd",
		t.proxy(this.hideModal,
		this)).emulateTransitionEnd(i.TRANSITION_DURATION): this.hideModal())
	},
	i.prototype.enforceFocus=function(){
		t(document).off("focusin.tc.modal").on("focusin.tc.modal",
		t.proxy(function(t){
			this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")
		},
		this))
	},
	i.prototype.escape=function(){
		this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.tc.modal",
		t.proxy(function(e){
			8==e.which&&"TEXTAREA"!=t(e.target||e.srcElement).prop("tagName")&&"INPUT"!=t(e.target||e.srcElement).prop("tagName")&&(e.preventDefault(),
			e.stopImmediatePropagation()),
			27==e.which&&this.hide()
		},
		this)): this.isShown||this.$element.off("keydown.dismiss.tc.modal")
	},
	i.prototype.resize=function(){
		this.isShown?t(window).on("resize.tc.modal",
		t.proxy(this.handleUpdate,
		this)): t(window).off("resize.tc.modal")
	},
	i.prototype.hideModal=function(){
		vart=this;this.$element.hide(),
		this.backdrop(function(){
			t.$body.removeClass("modal-open"),
			t.resetAdjustments(),
			t.resetScrollbar(),
			t.$element.trigger("hidden.tc.modal")
		})
	},
	i.prototype.removeBackdrop=function(){
		this.$backdrop&&this.$backdrop.remove(),
		this.$backdrop=null
	},
	i.prototype.backdrop=function(e){
		varn=this,
		o=this.$element.hasClass("fade")?"fade": "";if(this.isShown&&this.options.backdrop){
			vars=t.support.transition&&o;if(this.$backdrop=t('<divclass="modal-backdrop '+o+'"/>').prependTo(this.$element).on("click.dismiss.tc.modal",
			t.proxy(function(t){
				t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]): this.hide.call(this))
			},
			this)),
			s&&this.$backdrop[0].offsetWidth,
			this.$backdrop.addClass("in"),
			!e)return;s?this.$backdrop.one("tcTransitionEnd",
			e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION): e()
		}elseif(!this.isShown&&this.$backdrop){
			this.$backdrop.removeClass("in");varr=function(){
				n.removeBackdrop(),
				e&&e()
			};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("tcTransitionEnd",
			r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION): r()
		}elsee&&e()
	},
	i.prototype.handleUpdate=function(){
		this.options.backdrop&&this.adjustBackdrop(),
		this.adjustDialog()
	},
	i.prototype.adjustBackdrop=function(){
		this.$backdrop.css("height",
		0).css("height",
		this.$element[0].scrollHeight)
	},
	i.prototype.adjustDialog=function(){
		vart=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({
			paddingLeft: !this.bodyIsOverflowing&&t?this.scrollbarWidth: "",
			paddingRight: this.bodyIsOverflowing&&!t?this.scrollbarWidth: ""
		})
	},
	i.prototype.resetAdjustments=function(){
		this.$element.css({
			paddingLeft: "",
			paddingRight: ""
		})
	},
	i.prototype.checkScrollbar=function(){
		this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,
		this.scrollbarWidth=this.measureScrollbar()
	},
	i.prototype.setScrollbar=function(){
		vart=parseInt(this.$body.css("padding-right")||0,
		10);this.bodyIsOverflowing&&this.$body.css("padding-right",
		t+this.scrollbarWidth)
	},
	i.prototype.resetScrollbar=function(){
		this.$body.css("padding-right",
		"")
	},
	i.prototype.measureScrollbar=function(){
		vart=document.createElement("div");t.className="modal-scrollbar-measure",
		this.$body.append(t);vare=t.offsetWidth-t.clientWidth;returnthis.$body[0].removeChild(t),
		e
	};varn=t.fn.modal;t.fn.modal=e,
	t.fn.modal.Constructor=i,
	t.fn.modal.noConflict=function(){
		returnt.fn.modal=n,
		this
	},
	t(document).on("click.tc.modal.data-api",
	'[data-toggle="modal"]',
	function(i){
		varn=t(this),
		o=n.attr("href"),
		s=t(n.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/,
		"")),
		r=s.data("tc.modal")?"toggle": t.extend({
			remote: !/#/.test(o)&&o
		},
		s.data(),
		n.data());n.is("a")&&i.preventDefault(),
		s.one("show.tc.modal",
		function(t){
			t.isDefaultPrevented()||s.one("hidden.tc.modal",
			function(){
				n.is(":visible")&&n.trigger("focus")
			})
		}),
		e.call(s,
		r,
		this)
	})
}(jQuery),
+function(t){
	"use strict";functione(e){
		returnthis.each(function(){
			vari=t(this),
			o=i.data("tc.notification");o||i.data("tc.notification",
			o=newn(this)),
			"string"==typeofe&&o[e].call(i)
		})
	}vari='[data-dismiss="notification"]',
	n=function(e){
		t(e).on("click",
		i,
		this.close)
	};n.VERSION="1.0.0",
	n.TRANSITION_DURATION=150,
	n.prototype.close=function(e){
		functioni(){
			r.detach().trigger("closed.tc.notification").remove()
		}varo=t(this),
		s=o.attr("data-target");s||(s=o.attr("href"),
		s=s&&s.replace(/.*(?=#[^\s]*$)/,
		""));varr=t(s);e&&e.preventDefault(),
		r.length||(r=o.closest(".notification")),
		r.trigger(e=t.Event("close.tc.notification")),
		e.isDefaultPrevented()||(r.removeClass("in"),
		t.support.transition&&r.hasClass("fade")?r.one("tcTransitionEnd",
		i).emulateTransitionEnd(n.TRANSITION_DURATION): i())
	};varo=t.fn.notification;t.fn.notification=e,
	t.fn.notification.Constructor=n,
	t.fn.notification.noConflict=function(){
		returnt.fn.notification=o,
		this
	},
	t(document).on("click.tc.notification.data-api",
	i,
	n.prototype.close)
}(window.jQuery),
function(t,
e,
i){
	!function(t){
		"use strict";"function"==typeofdefine&&define.amd?define(["jquery"],
		t): jQuery&&!jQuery.fn.qtip&&t(jQuery)
	}(function(n){
		"use strict";functiono(t,
		e,
		i,
		o){
			this.id=i,
			this.target=t,
			this.tooltip=E,
			this.elements={
				target: t
			},
			this._id=L+"-"+i,
			this.timers={
				img: {
					
				}
			},
			this.options=e,
			this.plugins={
				
			},
			this.cache={
				event: {
					
				},
				target: n(),
				disabled: A,
				attr: o,
				onTooltip: A,
				lastClass: ""
			},
			this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=A
		}functions(t){
			returnt===E||"object"!==n.type(t)
		}functionr(t){
			return!(n.isFunction(t)||t&&t.attr||t.length||"object"===n.type(t)&&(t.jquery||t.then))
		}functiona(t){
			vare,
			i,
			o,
			a;returns(t)?A: (s(t.metadata)&&(t.metadata={
				type: t.metadata
			}),
			"content"int&&(e=t.content,
			s(e)||e.jquery||e.done?e=t.content={
				text: i=r(e)?A: e
			}: i=e.text,
			"ajax"ine&&(o=e.ajax,
			a=o&&o.once!==A,
			deletee.ajax,
			e.text=function(t,
			e){
				vars=i||n(this).attr(e.options.content.attr)||"Loading...",
				r=n.ajax(n.extend({
					
				},
				o,
				{
					context: e
				})).then(o.success,
				E,
				o.error).then(function(t){
					returnt&&a&&e.set("content.text",
					t),
					t
				},
				function(t,
				i,
				n){
					e.destroyed||0===t.status||e.set("content.text",
					i+": "+n)
				});returna?s: (e.set("content.text",
				s),
				r)
			}),
			"title"ine&&(n.isPlainObject(e.title)&&(e.button=e.title.button,
			e.title=e.title.text),
			r(e.title||A)&&(e.title=A))),
			"position"int&&s(t.position)&&(t.position={
				my: t.position,
				at: t.position
			}),
			"show"int&&s(t.show)&&(t.show=t.show.jquery?{
				target: t.show
			}: t.show===_?{
				ready: _
			}: {
				event: t.show
			}),
			"hide"int&&s(t.hide)&&(t.hide=t.hide.jquery?{
				target: t.hide
			}: {
				event: t.hide
			}),
			"style"int&&s(t.style)&&(t.style={
				classes: t.style
			}),
			n.each(z,
			function(){
				this.sanitize&&this.sanitize(t)
			}),
			t)
		}functionc(t,
		e){
			for(vari,
			n=0,
			o=t,
			s=e.split(".");o=o[s[n++]];)n<s.length&&(i=o);return[i||t,
			s.pop()]
		}functionl(t,
		e){
			vari,
			n,
			o;for(iinthis.checks)for(ninthis.checks[i])(o=newRegExp(n,
			"i").exec(t))&&(e.push(o),
			("builtin"===i||this.plugins[i])&&this.checks[i][n].apply(this.plugins[i]||this,
			e))
		}functiond(t){
			returnH.concat("").join(t?"-"+t+" ": " ")
		}functionh(t,
		e){
			returne>0?setTimeout(n.proxy(t,
			this),
			e): voidt.call(this)
		}functionu(t){
			this.tooltip.hasClass(X)||(clearTimeout(this.timers.show),
			clearTimeout(this.timers.hide),
			this.timers.show=h.call(this,
			function(){
				this.toggle(_,
				t)
			},
			this.options.show.delay))
		}functionp(t){
			if(!this.tooltip.hasClass(X)&&!this.destroyed){
				vare=n(t.relatedTarget),
				i=e.closest(W)[0]===this.tooltip[0],
				o=e[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),
				clearTimeout(this.timers.hide),
				this!==e[0]&&"mouse"===this.options.position.target&&i||this.options.hide.fixed&&/mouse(out|leave|move)/.test(t.type)&&(i||o))try{
					t.preventDefault(),
					t.stopImmediatePropagation()
				}catch(s){
					
				}elsethis.timers.hide=h.call(this,
				function(){
					this.toggle(A,
					t)
				},
				this.options.hide.delay,
				this)
			}
		}functionf(t){
			!this.tooltip.hasClass(X)&&this.options.hide.inactive&&(clearTimeout(this.timers.inactive),
			this.timers.inactive=h.call(this,
			function(){
				this.hide(t)
			},
			this.options.hide.inactive))
		}functionm(t){
			this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(t)
		}functiong(t,
		i,
		o){
			n(e.body).delegate(t,
			(i.split?i: i.join("."+L+" "))+"."+L,
			function(){
				vart=C.api[n.attr(this,
				U)];t&&!t.disabled&&o.apply(t,
				arguments)
			})
		}functionv(t,
		i,
		s){
			varr,
			c,
			l,
			d,
			h,
			u=n(e.body),
			p=t[0]===e?u: t,
			f=t.metadata?t.metadata(s.metadata): E,
			m="html5"===s.metadata.type&&f?f[s.metadata.name]: E,
			g=t.data(s.metadata.name||"qtipopts");try{
				g="string"==typeofg?n.parseJSON(g): g
			}catch(v){
				
			}if(d=n.extend(_,
			{
				
			},
			C.defaults,
			s,
			"object"==typeofg?a(g): E,
			a(m||f)),
			c=d.position,
			d.id=i,
			"boolean"==typeofd.content.text){
				if(l=t.attr(d.content.attr),
				d.content.attr===A||!l)returnA;d.content.text=l
			}if(c.container.length||(c.container=u),
			c.target===A&&(c.target=p),
			d.show.target===A&&(d.show.target=p),
			d.show.solo===_&&(d.show.solo=c.container.closest("body")),
			d.hide.target===A&&(d.hide.target=p),
			d.position.viewport===_&&(d.position.viewport=c.container),
			c.container=c.container.eq(0),
			c.at=newT(c.at,
			_),
			c.my=newT(c.my),
			t.data(L))if(d.overwrite)t.qtip("destroy",
			!0);elseif(d.overwrite===A)returnA;returnt.attr(B,
			i),
			d.suppress&&(h=t.attr("title"))&&t.removeAttr("title").attr(Z,
			h).attr("title",
			""),
			r=newo(t,
			d,
			i,
			!!l),
			t.data(L,
			r),
			r
		}functionb(t){
			returnt.charAt(0).toUpperCase()+t.slice(1)
		}functiony(t,
		e){
			varn,
			o,
			s=e.charAt(0).toUpperCase()+e.slice(1),
			r=(e+" "+ft.join(s+" ")+s).split(" "),
			a=0;if(pt[e])returnt.css(pt[e]);for(;n=r[a++];)if((o=t.css(n))!==i)returnpt[e]=n,
			o
		}functionw(t,
		e){
			returnMath.ceil(parseFloat(y(t,
			e)))
		}functionx(t,
		e){
			this._ns="tip",
			this.options=e,
			this.offset=e.offset,
			this.size=[e.width,
			e.height],
			this.init(this.qtip=t)
		}varC,
		$,
		T,
		S,
		k,
		_=!0,
		A=!1,
		E=null,
		I="x",
		j="y",
		D="width",
		R="height",
		O="top",
		q="left",
		M="bottom",
		N="right",
		P="center",
		F="shift",
		z={
			
		},
		L="qtip",
		B="data-hasqtip",
		U="data-qtip-id",
		H=["ui-widget",
		"ui-tooltip"],
		W="."+L,
		V="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),
		Q=L+"-fixed",
		Y=L+"-default",
		K=L+"-focus",
		G=L+"-hover",
		X=L+"-disabled",
		J="_replacedByqTip",
		Z="oldtitle",
		tt={
			ie: function(){
				for(vart=4,
				i=e.createElement("div");(i.innerHTML="<!--[if gt IE "+t+"]><i></i><![endif]-->")&&i.getElementsByTagName("i")[0];t+=1);returnt>4?t: NaN
			}(),
			iOS: parseFloat((""+(/CPU.*OS([0-9_]{
				1,
				5
			})|(CPUlike).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,
			""])[1]).replace("undefined",
			"3_2").replace("_",
			".").replace("_",
			""))||A
		};$=o.prototype,
		$._when=function(t){
			returnn.when.apply(n,
			t)
		},
		$.render=function(t){
			if(this.rendered||this.destroyed)returnthis;vare,
			i=this,
			o=this.options,
			s=this.cache,
			r=this.elements,
			a=o.content.text,
			c=o.content.title,
			l=o.content.button,
			d=o.position,
			h=("."+this._id+" ",
			[]);returnn.attr(this.target[0],
			"aria-describedby",
			this._id),
			s.posClass=this._createPosClass((this.position={
				my: d.my,
				at: d.at
			}).my),
			this.tooltip=r.tooltip=e=n("<div/>",
			{
				id: this._id,
				"class": [L,
				Y,
				o.style.classes,
				s.posClass].join(" "),
				width: o.style.width||"",
				height: o.style.height||"",
				tracking: "mouse"===d.target&&d.adjust.mouse,
				role: "alert",
				"aria-live": "polite",
				"aria-atomic": A,
				"aria-describedby": this._id+"-content",
				"aria-hidden": _
			}).toggleClass(X,
			this.disabled).attr(U,
			this.id).data(L,
			this).appendTo(d.container).append(r.content=n("<div />",
			{
				"class": L+"-content",
				id: this._id+"-content",
				"aria-atomic": _
			})),
			this.rendered=-1,
			this.positioning=_,
			c&&(this._createTitle(),
			n.isFunction(c)||h.push(this._updateTitle(c,
			A))),
			l&&this._createButton(),
			n.isFunction(a)||h.push(this._updateContent(a,
			A)),
			this.rendered=_,
			this._setWidget(),
			n.each(z,
			function(t){
				vare;"render"===this.initialize&&(e=this(i))&&(i.plugins[t]=e)
			}),
			this._unassignEvents(),
			this._assignEvents(),
			this._when(h).then(function(){
				i._trigger("render"),
				i.positioning=A,
				i.hiddenDuringWait||!o.show.ready&&!t||i.toggle(_,
				s.event,
				A),
				i.hiddenDuringWait=A
			}),
			C.api[this.id]=this,
			this
		},
		$.destroy=function(t){
			functione(){
				if(!this.destroyed){
					this.destroyed=_;vart,
					e=this.target,
					i=e.attr(Z);this.rendered&&this.tooltip.stop(1,
					0).find("*").remove().end().remove(),
					n.each(this.plugins,
					function(t){
						this.destroy&&this.destroy()
					});for(tinthis.timers)clearTimeout(this.timers[t]);e.removeData(L).removeAttr(U).removeAttr(B).removeAttr("aria-describedby"),
					this.options.suppress&&i&&e.attr("title",
					i).removeAttr(Z),
					this._unassignEvents(),
					this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=E,
					deleteC.api[this.id]
				}
			}returnthis.destroyed?this.target: (t===_&&"hide"!==this.triggering||!this.rendered?e.call(this): (this.tooltip.one("tooltiphidden",
			n.proxy(e,
			this)),
			!this.triggering&&this.hide()),
			this.target)
		},
		S=$.checks={
			builtin: {
				"^id$": function(t,
				e,
				i,
				o){
					vars=i===_?C.nextid: i,
					r=L+"-"+s;s!==A&&s.length>0&&!n("#"+r).length?(this._id=r,
					this.rendered&&(this.tooltip[0].id=this._id,
					this.elements.content[0].id=this._id+"-content",
					this.elements.title[0].id=this._id+"-title")): t[e]=o
				},
				"^prerender": function(t,
				e,
				i){
					i&&!this.rendered&&this.render(this.options.show.ready)
				},
				"^content.text$": function(t,
				e,
				i){
					this._updateContent(i)
				},
				"^content.attr$": function(t,
				e,
				i,
				n){
					this.options.content.text===this.target.attr(n)&&this._updateContent(this.target.attr(i))
				},
				"^content.title$": function(t,
				e,
				i){
					returni?(i&&!this.elements.title&&this._createTitle(),
					voidthis._updateTitle(i)): this._removeTitle()
				},
				"^content.button$": function(t,
				e,
				i){
					this._updateButton(i)
				},
				"^content.title.(text|button)$": function(t,
				e,
				i){
					this.set("content."+e,
					i)
				},
				"^position.(my|at)$": function(t,
				e,
				i){
					"string"==typeofi&&(this.position[e]=t[e]=newT(i,
					"at"===e))
				},
				"^position.container$": function(t,
				e,
				i){
					this.rendered&&this.tooltip.appendTo(i)
				},
				"^show.ready$": function(t,
				e,
				i){
					i&&(!this.rendered&&this.render(_)||this.toggle(_))
				},
				"^style.classes$": function(t,
				e,
				i,
				n){
					this.rendered&&this.tooltip.removeClass(n).addClass(i)
				},
				"^style.(width|height)": function(t,
				e,
				i){
					this.rendered&&this.tooltip.css(e,
					i)
				},
				"^style.widget|content.title": function(){
					this.rendered&&this._setWidget()
				},
				"^style.def": function(t,
				e,
				i){
					this.rendered&&this.tooltip.toggleClass(Y,
					!!i)
				},
				"^events.(render|show|move|hide|focus|blur)$": function(t,
				e,
				i){
					this.rendered&&this.tooltip[(n.isFunction(i)?"": "un")+"bind"]("tooltip"+e,
					i)
				},
				"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function(){
					if(this.rendered){
						vart=this.options.position;this.tooltip.attr("tracking",
						"mouse"===t.target&&t.adjust.mouse),
						this._unassignEvents(),
						this._assignEvents()
					}
				}
			}
		},
		$.get=function(t){
			if(this.destroyed)returnthis;vare=c(this.options,
			t.toLowerCase()),
			i=e[0][e[1]];returni.precedance?i.string(): i
		};varet=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
		it=/^prerender|show\.ready/i;$.set=function(t,
		e){
			if(this.destroyed)returnthis;vari,
			o=this.rendered,
			s=A,
			r=this.options;this.checks;return"string"==typeoft?(i=t,
			t={
				
			},
			t[i]=e): t=n.extend({
				
			},
			t),
			n.each(t,
			function(e,
			i){
				if(o&&it.test(e))returnvoiddeletet[e];vara,
				l=c(r,
				e.toLowerCase());a=l[0][l[1]],
				l[0][l[1]]=i&&i.nodeType?n(i): i,
				s=et.test(e)||s,
				t[e]=[l[0],
				l[1],
				i,
				a]
			}),
			a(r),
			this.positioning=_,
			n.each(t,
			n.proxy(l,
			this)),
			this.positioning=A,
			this.rendered&&this.tooltip[0].offsetWidth>0&&s&&this.reposition("mouse"===r.position.target?E: this.cache.event),
			this
		},
		$._update=function(t,
		e,
		i){
			varo=this,
			s=this.cache;returnthis.rendered&&t?(n.isFunction(t)&&(t=t.call(this.elements.target,
			s.event,
			this)||""),
			n.isFunction(t.then)?(s.waiting=_,
			t.then(function(t){
				returns.waiting=A,
				o._update(t,
				e)
			},
			E,
			function(t){
				returno._update(t,
				e)
			})): t===A||!t&&""!==t?A: (t.jquery&&t.length>0?e.empty().append(t.css({
				display: "block",
				visibility: "visible"
			})): e.html(t),
			this._waitForContent(e).then(function(t){
				o.rendered&&o.tooltip[0].offsetWidth>0&&o.reposition(s.event,
				!t.length)
			}))): A
		},
		$._waitForContent=function(t){
			vare=this.cache;returne.waiting=_,
			(n.fn.imagesLoaded?t.imagesLoaded(): n.Deferred().resolve([])).done(function(){
				e.waiting=A
			}).promise()
		},
		$._updateContent=function(t,
		e){
			this._update(t,
			this.elements.content,
			e)
		},
		$._updateTitle=function(t,
		e){
			this._update(t,
			this.elements.title,
			e)===A&&this._removeTitle(A)
		},
		$._createTitle=function(){
			vart=this.elements,
			e=this._id+"-title";t.titlebar&&this._removeTitle(),
			t.titlebar=n("<div />",
			{
				"class": L+"-titlebar "+(this.options.style.widget?d("header"): "")
			}).append(t.title=n("<div />",
			{
				id: e,
				"class": L+"-title",
				"aria-atomic": _
			})).insertBefore(t.content).delegate(".qtip-close",
			"mousedown keydown mouseup keyup mouseout",
			function(t){
				n(this).toggleClass("ui-state-active ui-state-focus",
				"down"===t.type.substr(-4))
			}).delegate(".qtip-close",
			"mouseover mouseout",
			function(t){
				n(this).toggleClass("ui-state-hover",
				"mouseover"===t.type)
			}),
			this.options.content.button&&this._createButton()
		},
		$._removeTitle=function(t){
			vare=this.elements;e.title&&(e.titlebar.remove(),
			e.titlebar=e.title=e.button=E,
			t!==A&&this.reposition())
		},
		$._createPosClass=function(t){
			returnL+"-pos-"+(t||this.options.position.my).abbrev()
		},
		$.reposition=function(i,
		o){
			if(!this.rendered||this.positioning||this.destroyed)returnthis;this.positioning=_;vars,
			r,
			a,
			c,
			l=this.cache,
			d=this.tooltip,
			h=this.options.position,
			u=h.target,
			p=h.my,
			f=h.at,
			m=h.viewport,
			g=h.container,
			v=h.adjust,
			b=v.method.split(" "),
			y=d.outerWidth(A),
			w=d.outerHeight(A),
			x=0,
			C=0,
			$=d.css("position"),
			T={
				left: 0,
				top: 0
			},
			S=d[0].offsetWidth>0,
			k=i&&"scroll"===i.type,
			E=n(t),
			I=g[0].ownerDocument,
			j=this.mouse;if(n.isArray(u)&&2===u.length)f={
				x: q,
				y: O
			},
			T={
				left: u[0],
				top: u[1]
			};elseif("mouse"===u)f={
				x: q,
				y: O
			},
			(!v.mouse||this.options.hide.distance)&&l.origin&&l.origin.pageX?i=l.origin: !i||i&&("resize"===i.type||"scroll"===i.type)?i=l.event: j&&j.pageX&&(i=j),
			"static"!==$&&(T=g.offset()),
			I.body.offsetWidth!==(t.innerWidth||I.documentElement.clientWidth)&&(r=n(e.body).offset()),
			T={
				left: i.pageX-T.left+(r&&r.left||0),
				top: i.pageY-T.top+(r&&r.top||0)
			},
			v.mouse&&k&&j&&(T.left-=(j.scrollX||0)-E.scrollLeft(),
			T.top-=(j.scrollY||0)-E.scrollTop());else{
				if("event"===u?i&&i.target&&"scroll"!==i.type&&"resize"!==i.type?l.target=n(i.target): i.target||(l.target=this.elements.target): "event"!==u&&(l.target=n(u.jquery?u: this.elements.target)),
				u=l.target,
				u=n(u).eq(0),
				0===u.length)returnthis;u[0]===e||u[0]===t?(x=tt.iOS?t.innerWidth: u.width(),
				C=tt.iOS?t.innerHeight: u.height(),
				u[0]===t&&(T={
					top: (m||u).scrollTop(),
					left: (m||u).scrollLeft()
				})): z.imagemap&&u.is("area")?s=z.imagemap(this,
				u,
				f,
				z.viewport?b: A): z.svg&&u&&u[0].ownerSVGElement?s=z.svg(this,
				u,
				f,
				z.viewport?b: A): (x=u.outerWidth(A),
				C=u.outerHeight(A),
				T=u.offset()),
				s&&(x=s.width,
				C=s.height,
				r=s.offset,
				T=s.position),
				T=this.reposition.offset(u,
				T,
				g),
				(tt.iOS>3.1&&tt.iOS<4.1||tt.iOS>=4.3&&tt.iOS<4.33||!tt.iOS&&"fixed"===$)&&(T.left-=E.scrollLeft(),
				T.top-=E.scrollTop()),
				(!s||s&&s.adjustable!==A)&&(T.left+=f.x===N?x: f.x===P?x/2: 0,
				T.top+=f.y===M?C: f.y===P?C/2: 0)
			}returnT.left+=v.x+(p.x===N?-y: p.x===P?-y/2: 0),
			T.top+=v.y+(p.y===M?-w: p.y===P?-w/2: 0),
			z.viewport?(a=T.adjusted=z.viewport(this,
			T,
			h,
			x,
			C,
			y,
			w),
			r&&a.left&&(T.left+=r.left),
			r&&a.top&&(T.top+=r.top),
			a.my&&(this.position.my=a.my)): T.adjusted={
				left: 0,
				top: 0
			},
			l.posClass!==(c=this._createPosClass(this.position.my))&&d.removeClass(l.posClass).addClass(l.posClass=c),
			this._trigger("move",
			[T,
			m.elem||m],
			i)?(deleteT.adjusted,
			o===A||!S||isNaN(T.left)||isNaN(T.top)||"mouse"===u||!n.isFunction(h.effect)?d.css(T): n.isFunction(h.effect)&&(h.effect.call(d,
			this,
			n.extend({
				
			},
			T)),
			d.queue(function(t){
				n(this).css({
					opacity: "",
					height: ""
				}),
				tt.ie&&this.style.removeAttribute("filter"),
				t()
			})),
			this.positioning=A,
			this): this
		},
		$.reposition.offset=function(t,
		i,
		o){
			functions(t,
			e){
				i.left+=e*t.scrollLeft(),
				i.top+=e*t.scrollTop()
			}if(!o[0])returni;varr,
			a,
			c,
			l,
			d=n(t[0].ownerDocument),
			h=!!tt.ie&&"CSS1Compat"!==e.compatMode,
			u=o[0];do"static"!==(a=n.css(u,
			"position"))&&("fixed"===a?(c=u.getBoundingClientRect(),
			s(d,
			-1)): (c=n(u).position(),
			c.left+=parseFloat(n.css(u,
			"borderLeftWidth"))||0,
			c.top+=parseFloat(n.css(u,
			"borderTopWidth"))||0),
			i.left-=c.left+(parseFloat(n.css(u,
			"marginLeft"))||0),
			i.top-=c.top+(parseFloat(n.css(u,
			"marginTop"))||0),
			r||"hidden"===(l=n.css(u,
			"overflow"))||"visible"===l||(r=n(u)));while(u=u.offsetParent);returnr&&(r[0]!==d[0]||h)&&s(r,
			1),
			i
		};varnt=(T=$.reposition.Corner=function(t,
		e){
			t=(""+t).replace(/([A-Z])/,
			" $1").replace(/middle/gi,
			P).toLowerCase(),
			this.x=(t.match(/left|right/i)||t.match(/center/)||["inherit"])[0].toLowerCase(),
			this.y=(t.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),
			this.forceY=!!e;vari=t.charAt(0);this.precedance="t"===i||"b"===i?j: I
		}).prototype;nt.invert=function(t,
		e){
			this[t]=this[t]===q?N: this[t]===N?q: e||this[t]
		},
		nt.string=function(t){
			vare=this.x,
			i=this.y,
			n=e!==i?"center"===e||"center"!==i&&(this.precedance===j||this.forceY)?[i,
			e]: [e,
			i]: [e];returnt!==!1?n.join(" "): n
		},
		nt.abbrev=function(){
			vart=this.string(!1);returnt[0].charAt(0)+(t[1]&&t[1].charAt(0)||"")
		},
		nt.clone=function(){
			returnnewT(this.string(),
			this.forceY)
		},
		$.toggle=function(t,
		i){
			varo=this.cache,
			s=this.options,
			r=this.tooltip;if(i){
				if(/over|enter/.test(i.type)&&o.event&&/out|leave/.test(o.event.type)&&s.show.target.add(i.target).length===s.show.target.length&&r.has(i.relatedTarget).length)returnthis;o.event=n.event.fix(i)
			}if(this.waiting&&!t&&(this.hiddenDuringWait=_),
			!this.rendered)returnt?this.render(1): this;if(this.destroyed||this.disabled)returnthis;vara,
			c,
			l,
			d=t?"show": "hide",
			h=this.options[d],
			u=(this.options[t?"hide": "show"],
			this.options.position),
			p=this.options.content,
			f=this.tooltip.css("width"),
			m=this.tooltip.is(":visible"),
			g=t||1===h.target.length,
			v=!i||h.target.length<2||o.target[0]===i.target;return(typeoft).search("boolean|number")&&(t=!m),
			a=!r.is(":animated")&&m===t&&v,
			c=a?E: !!this._trigger(d,
			[90]),
			this.destroyed?this: (c!==A&&t&&this.focus(i),
			!c||a?this: (n.attr(r[0],
			"aria-hidden",
			!t),
			t?(this.mouse&&(o.origin=n.event.fix(this.mouse)),
			n.isFunction(p.text)&&this._updateContent(p.text,
			A),
			n.isFunction(p.title)&&this._updateTitle(p.title,
			A),
			!k&&"mouse"===u.target&&u.adjust.mouse&&(n(e).bind("mousemove."+L,
			this._storeMouse),
			k=_),
			f||r.css("width",
			r.outerWidth(A)),
			this.reposition(i,
			arguments[2]),
			f||r.css("width",
			""),
			h.solo&&("string"==typeofh.solo?n(h.solo): n(W,
			h.solo)).not(r).not(h.target).qtip("hide",
			n.Event("tooltipsolo"))): (clearTimeout(this.timers.show),
			deleteo.origin,
			k&&!n(W+'[tracking="true"]: visible',
			h.solo).not(r).length&&(n(e).unbind("mousemove."+L),
			k=A),
			this.blur(i)),
			l=n.proxy(function(){
				t?(tt.ie&&r[0].style.removeAttribute("filter"),
				r.css("overflow",
				""),
				"string"==typeofh.autofocus&&n(this.options.show.autofocus,
				r).focus(),
				this.options.show.target.trigger("qtip-"+this.id+"-inactive")): r.css({
					display: "",
					visibility: "",
					opacity: "",
					left: "",
					top: ""
				}),
				this._trigger(t?"visible": "hidden")
			},
			this),
			h.effect===A||g===A?(r[d](),
			l()): n.isFunction(h.effect)?(r.stop(1,
			1),
			h.effect.call(r,
			this),
			r.queue("fx",
			function(t){
				l(),
				t()
			})): r.fadeTo(90,
			t?1: 0,
			l),
			t&&h.target.trigger("qtip-"+this.id+"-inactive"),
			this))
		},
		$.show=function(t){
			returnthis.toggle(_,
			t)
		},
		$.hide=function(t){
			returnthis.toggle(A,
			t)
		},
		$.focus=function(t){
			if(!this.rendered||this.destroyed)returnthis;vare=n(W),
			i=this.tooltip,
			o=parseInt(i[0].style.zIndex,
			10),
			s=C.zindex+e.length;returni.hasClass(K)||this._trigger("focus",
			[s],
			t)&&(o!==s&&(e.each(function(){
				this.style.zIndex>o&&(this.style.zIndex=this.style.zIndex-1)
			}),
			e.filter("."+K).qtip("blur",
			t)),
			i.addClass(K)[0].style.zIndex=s),
			this
		},
		$.blur=function(t){
			return!this.rendered||this.destroyed?this: (this.tooltip.removeClass(K),
			this._trigger("blur",
			[this.tooltip.css("zIndex")],
			t),
			this)
		},
		$.disable=function(t){
			returnthis.destroyed?this: ("toggle"===t?t=!(this.rendered?this.tooltip.hasClass(X): this.disabled): "boolean"!=typeoft&&(t=_),
			this.rendered&&this.tooltip.toggleClass(X,
			t).attr("aria-disabled",
			t),
			this.disabled=!!t,
			this)
		},
		$.enable=function(){
			returnthis.disable(A)
		},
		$._createButton=function(){
			vart=this,
			e=this.elements,
			i=e.tooltip,
			o=this.options.content.button,
			s="string"==typeofo,
			r=s?o: "Close tooltip";e.button&&e.button.remove(),
			o.jquery?e.button=o: e.button=n("<a />",
			{
				"class": "qtip-close "+(this.options.style.widget?"": L+"-icon"),
				title: r,
				"aria-label": r
			}).prepend(n("<span />",
			{
				"class": "ui-icon ui-icon-close",
				html: "&times;"
			})),
			e.button.appendTo(e.titlebar||i).attr("role",
			"button").click(function(e){
				returni.hasClass(X)||t.hide(e),
				A
			})
		},
		$._updateButton=function(t){
			if(!this.rendered)returnA;vare=this.elements.button;t?this._createButton(): e.remove()
		},
		$._setWidget=function(){
			vart=this.options.style.widget,
			e=this.elements,
			i=e.tooltip,
			n=i.hasClass(X);i.removeClass(X),
			X=t?"ui-state-disabled": "qtip-disabled",
			i.toggleClass(X,
			n),
			i.toggleClass("ui-helper-reset "+d(),
			t).toggleClass(Y,
			this.options.style.def&&!t),
			e.content&&e.content.toggleClass(d("content"),
			t),
			e.titlebar&&e.titlebar.toggleClass(d("header"),
			t),
			e.button&&e.button.toggleClass(L+"-icon",
			!t)
		},
		$._storeMouse=function(t){
			return(this.mouse=n.event.fix(t)).type="mousemove",
			this
		},
		$._bind=function(t,
		e,
		i,
		o,
		s){
			if(t&&i&&e.length){
				varr="."+this._id+(o?"-"+o: "");returnn(t).bind((e.split?e: e.join(r+" "))+r,
				n.proxy(i,
				s||this)),
				this
			}
		},
		$._unbind=function(t,
		e){
			returnt&&n(t).unbind("."+this._id+(e?"-"+e: "")),
			this
		},
		$._trigger=function(t,
		e,
		i){
			varo=n.Event("tooltip"+t);returno.originalEvent=i&&n.extend({
				
			},
			i)||this.cache.event||E,
			this.triggering=t,
			this.tooltip.trigger(o,
			[this].concat(e||[])),
			this.triggering=A,
			!o.isDefaultPrevented()
		},
		$._bindEvents=function(t,
		e,
		i,
		o,
		s,
		r){
			vara=i.filter(o).add(o.filter(i)),
			c=[];a.length&&(n.each(e,
			function(e,
			i){
				varo=n.inArray(i,
				t);o>-1&&c.push(t.splice(o,
				1)[0])
			}),
			c.length&&(this._bind(a,
			c,
			function(t){
				vare=this.rendered?this.tooltip[0].offsetWidth>0: !1;(e?r: s).call(this,
				t)
			}),
			i=i.not(a),
			o=o.not(a))),
			this._bind(i,
			t,
			s),
			this._bind(o,
			e,
			r)
		},
		$._assignInitialEvents=function(t){
			functione(t){
				returnthis.disabled||this.destroyed?A: (this.cache.event=t&&n.event.fix(t),
				this.cache.target=t&&n(t.target),
				clearTimeout(this.timers.show),
				void(this.timers.show=h.call(this,
				function(){
					this.render("object"==typeoft||i.show.ready)
				},
				i.prerender?0: i.show.delay)))
			}vari=this.options,
			o=i.show.target,
			s=i.hide.target,
			r=i.show.event?n.trim(""+i.show.event).split(" "): [],
			a=i.hide.event?n.trim(""+i.hide.event).split(" "): [];this._bind(this.elements.target,
			["remove",
			"removeqtip"],
			function(t){
				this.destroy(!0)
			},
			"destroy"),
			/mouse(over|enter)/i.test(i.show.event)&&!/mouse(out|leave)/i.test(i.hide.event)&&a.push("mouseleave"),
			this._bind(o,
			"mousemove",
			function(t){
				this._storeMouse(t),
				this.cache.onTarget=_
			}),
			this._bindEvents(r,
			a,
			o,
			s,
			e,
			function(){
				returnthis.timers?voidclearTimeout(this.timers.show): A
			}),
			(i.show.ready||i.prerender)&&e.call(this,
			t)
		},
		$._assignEvents=function(){
			vari=this,
			o=this.options,
			s=o.position,
			r=this.tooltip,
			a=o.show.target,
			c=o.hide.target,
			l=s.container,
			d=s.viewport,
			h=n(e),
			g=(n(e.body),
			n(t)),
			v=o.show.event?n.trim(""+o.show.event).split(" "): [],
			b=o.hide.event?n.trim(""+o.hide.event).split(" "): [];n.each(o.events,
			function(t,
			e){
				i._bind(r,
				"toggle"===t?["tooltipshow",
				"tooltiphide"]: ["tooltip"+t],
				e,
				null,
				r)
			}),
			/mouse(out|leave)/i.test(o.hide.event)&&"window"===o.hide.leave&&this._bind(h,
			["mouseout",
			"blur"],
			function(t){
				/select|option/.test(t.target.nodeName)||t.relatedTarget||this.hide(t)
			}),
			o.hide.fixed?c=c.add(r.addClass(Q)): /mouse(over|enter)/i.test(o.show.event)&&this._bind(c,
			"mouseleave",
			function(){
				clearTimeout(this.timers.show)
			}),
			(""+o.hide.event).indexOf("unfocus")>-1&&this._bind(l.closest("html"),
			["mousedown",
			"touchstart"],
			function(t){
				vare=n(t.target),
				i=this.rendered&&!this.tooltip.hasClass(X)&&this.tooltip[0].offsetWidth>0,
				o=e.parents(W).filter(this.tooltip[0]).length>0;e[0]===this.target[0]||e[0]===this.tooltip[0]||o||this.target.has(e[0]).length||!i||this.hide(t)
			}),
			"number"==typeofo.hide.inactive&&(this._bind(a,
			"qtip-"+this.id+"-inactive",
			f,
			"inactive"),
			this._bind(c.add(r),
			C.inactiveEvents,
			f)),
			this._bindEvents(v,
			b,
			a,
			c,
			u,
			p),
			this._bind(a.add(r),
			"mousemove",
			function(t){
				if("number"==typeofo.hide.distance){
					vare=this.cache.origin||{
						
					},
					i=this.options.hide.distance,
					n=Math.abs;(n(t.pageX-e.pageX)>=i||n(t.pageY-e.pageY)>=i)&&this.hide(t)
				}this._storeMouse(t)
			}),
			"mouse"===s.target&&s.adjust.mouse&&(o.hide.event&&this._bind(a,
			["mouseenter",
			"mouseleave"],
			function(t){
				returnthis.cache?void(this.cache.onTarget="mouseenter"===t.type): A
			}),
			this._bind(h,
			"mousemove",
			function(t){
				this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(X)&&this.tooltip[0].offsetWidth>0&&this.reposition(t)
			})),
			(s.adjust.resize||d.length)&&this._bind(n.event.special.resize?d: g,
			"resize",
			m),
			s.adjust.scroll&&this._bind(g.add(s.container),
			"scroll",
			m)
		},
		$._unassignEvents=function(){
			vari=this.options,
			o=i.show.target,
			s=i.hide.target,
			r=n.grep([this.elements.target[0],
			this.rendered&&this.tooltip[0],
			i.position.container[0],
			i.position.viewport[0],
			i.position.container.closest("html")[0],
			t,
			e],
			function(t){
				return"object"==typeoft
			});o&&o.toArray&&(r=r.concat(o.toArray())),
			s&&s.toArray&&(r=r.concat(s.toArray())),
			this._unbind(r)._unbind(r,
			"destroy")._unbind(r,
			"inactive")
		},
		n(function(){
			g(W,
			["mouseenter",
			"mouseleave"],
			function(t){
				vare="mouseenter"===t.type,
				i=n(t.currentTarget),
				o=n(t.relatedTarget||t.target),
				s=this.options;e?(this.focus(t),
				i.hasClass(Q)&&!i.hasClass(X)&&clearTimeout(this.timers.hide)): "mouse"===s.position.target&&s.position.adjust.mouse&&s.hide.event&&s.show.target&&!o.closest(s.show.target[0]).length&&this.hide(t),
				i.toggleClass(G,
				e)
			}),
			g("["+U+"]",
			V,
			f)
		}),
		C=n.fn.qtip=function(t,
		e,
		o){
			vars=(""+t).toLowerCase(),
			r=E,
			c=n.makeArray(arguments).slice(1),
			l=c[c.length-1],
			d=this[0]?n.data(this[0],
			L): E;return!arguments.length&&d||"api"===s?d: "string"==typeoft?(this.each(function(){
				vart=n.data(this,
				L);if(!t)return_;if(l&&l.timeStamp&&(t.cache.event=l),
				!e||"option"!==s&&"options"!==s)t[s]&&t[s].apply(t,
				c);else{
					if(o===i&&!n.isPlainObject(e))returnr=t.get(e),
					A;t.set(e,
					o)
				}
			}),
			r!==E?r: this): "object"!=typeoft&&arguments.length?void0: (d=a(n.extend(_,
			{
				
			},
			t)),
			this.each(function(t){
				vare,
				i;returni=n.isArray(d.id)?d.id[t]: d.id,
				i=!i||i===A||i.length<1||C.api[i]?C.nextid++: i,
				e=v(n(this),
				i,
				d),
				e===A?_: (C.api[i]=e,
				n.each(z,
				function(){
					"initialize"===this.initialize&&this(e)
				}),
				voide._assignInitialEvents(l))
			}))
		},
		n.qtip=o,
		C.api={
			
		},
		n.each({
			attr: function(t,
			e){
				if(this.length){
					vari=this[0],
					o="title",
					s=n.data(i,
					"qtip");if(t===o&&s&&"object"==typeofs&&s.options.suppress)returnarguments.length<2?n.attr(i,
					Z): (s&&s.options.content.attr===o&&s.cache.attr&&s.set("content.text",
					e),
					this.attr(Z,
					e))
				}returnn.fn["attr"+J].apply(this,
				arguments)
			},
			clone: function(t){
				vare=(n([]),
				n.fn["clone"+J].apply(this,
				arguments));returnt||e.filter("["+Z+"]").attr("title",
				function(){
					returnn.attr(this,
					Z)
				}).removeAttr(Z),
				e
			}
		},
		function(t,
		e){
			if(!e||n.fn[t+J])return_;vari=n.fn[t+J]=n.fn[t];n.fn[t]=function(){
				returne.apply(this,
				arguments)||i.apply(this,
				arguments)
			}
		}),
		n.ui||(n["cleanData"+J]=n.cleanData,
		n.cleanData=function(t){
			for(vare,
			i=0;(e=n(t[i])).length;i++)if(e.attr(B))try{
				e.triggerHandler("removeqtip")
			}catch(o){
				
			}n["cleanData"+J].apply(this,
			arguments)
		}),
		C.version="2.2.1",
		C.nextid=0,
		C.inactiveEvents=V,
		C.zindex=15e3,
		C.defaults={
			prerender: A,
			id: A,
			overwrite: _,
			suppress: _,
			content: {
				text: _,
				attr: "title",
				title: A,
				button: A
			},
			position: {
				my: "top left",
				at: "bottom right",
				target: A,
				container: A,
				viewport: A,
				adjust: {
					x: 0,
					y: 0,
					mouse: _,
					scroll: _,
					resize: _,
					method: "flipinvert flipinvert"
				},
				effect: function(t,
				e,
				i){
					n(this).animate(e,
					{
						duration: 200,
						queue: A
					})
				}
			},
			show: {
				target: A,
				event: "mouseenter",
				effect: _,
				delay: 90,
				solo: A,
				ready: A,
				autofocus: A
			},
			hide: {
				target: A,
				event: "mouseleave",
				effect: _,
				delay: 0,
				fixed: A,
				inactive: A,
				leave: "window",
				distance: A
			},
			style: {
				classes: "",
				widget: A,
				width: A,
				height: A,
				def: _
			},
			events: {
				render: E,
				move: E,
				show: E,
				hide: E,
				toggle: E,
				visible: E,
				hidden: E,
				focus: E,
				blur: E
			}
		};varot,
		st="margin",
		rt="border",
		at="color",
		ct="background-color",
		lt="transparent",
		dt=" !important",
		ht=!!e.createElement("canvas").getContext,
		ut=/rgba?\(0,
		0,
		0(,
		0)?\)|transparent|#123456/i,
		pt={
			
		},
		ft=["Webkit",
		"O",
		"Moz",
		"ms"];if(ht)varmt=t.devicePixelRatio||1,
		gt=function(){
			vart=e.createElement("canvas").getContext("2d");returnt.backingStorePixelRatio||t.webkitBackingStorePixelRatio||t.mozBackingStorePixelRatio||t.msBackingStorePixelRatio||t.oBackingStorePixelRatio||1
		}(),
		vt=mt/gt;elsevarbt=function(t,
		e,
		i){
			return"<qtipvml:"+t+'xmlns="urn:schemas-microsoft.com:vml"class="qtip-vml"'+(e||"")+'style="behavior: url(#default#VML); '+(i||"")+'"/>'
		};n.extend(x.prototype,
		{
			init: function(t){
				vare,
				i;i=this.element=t.elements.tip=n("<div />",
				{
					"class": L+"-tip"
				}).prependTo(t.tooltip),
				ht?(e=n("<canvas />").appendTo(this.element)[0].getContext("2d"),
				e.lineJoin="miter",
				e.miterLimit=1e5,
				e.save()): (e=bt("shape",
				'coordorigin="0,0"',
				"position:absolute;"),
				this.element.html(e+e),
				t._bind(n("*",
				i).add(i),
				["click",
				"mousedown"],
				function(t){
					t.stopPropagation()
				},
				this._ns)),
				t._bind(t.tooltip,
				"tooltipmove",
				this.reposition,
				this._ns,
				this),
				this.create()
			},
			_swapDimensions: function(){
				this.size[0]=this.options.height,
				this.size[1]=this.options.width
			},
			_resetDimensions: function(){
				this.size[0]=this.options.width,
				this.size[1]=this.options.height
			},
			_useTitle: function(t){
				vare=this.qtip.elements.titlebar;returne&&(t.y===O||t.y===P&&this.element.position().top+this.size[1]/2+this.options.offset<e.outerHeight(_))
			},
			_parseCorner: function(t){
				vare=this.qtip.options.position.my;returnt===A||e===A?t=A: t===_?t=newT(e.string()): t.string||(t=newT(t),
				t.fixed=_),
				t
			},
			_parseWidth: function(t,
			e,
			i){
				varn=this.qtip.elements,
				o=rt+b(e)+"Width";return(i?w(i,
				o): w(n.content,
				o)||w(this._useTitle(t)&&n.titlebar||n.content,
				o)||w(n.tooltip,
				o))||0
			},
			_parseRadius: function(t){
				vare=this.qtip.elements,
				i=rt+b(t.y)+b(t.x)+"Radius";returntt.ie<9?0: w(this._useTitle(t)&&e.titlebar||e.content,
				i)||w(e.tooltip,
				i)||0
			},
			_invalidColour: function(t,
			e,
			i){
				varn=t.css(e);return!n||i&&n===t.css(i)||ut.test(n)?A: n
			},
			_parseColours: function(t){
				vare=this.qtip.elements,
				i=this.element.css("cssText",
				""),
				o=rt+b(t[t.precedance])+b(at),
				s=this._useTitle(t)&&e.titlebar||e.content,
				r=this._invalidColour,
				a=[];returna[0]=r(i,
				ct)||r(s,
				ct)||r(e.content,
				ct)||r(e.tooltip,
				ct)||i.css(ct),
				a[1]=r(i,
				o,
				at)||r(s,
				o,
				at)||r(e.content,
				o,
				at)||r(e.tooltip,
				o,
				at)||e.tooltip.css(o),
				n("*",
				i).add(i).css("cssText",
				ct+":"+lt+dt+";"+rt+":0"+dt+";"),
				a
			},
			_calculateSize: function(t){
				vare,
				i,
				n,
				o=t.precedance===j,
				s=this.options.width,
				r=this.options.height,
				a="c"===t.abbrev(),
				c=(o?s: r)*(a?.5: 1),
				l=Math.pow,
				d=Math.round,
				h=Math.sqrt(l(c,
				2)+l(r,
				2)),
				u=[this.border/c*h,
				this.border/r*h];returnu[2]=Math.sqrt(l(u[0],
				2)-l(this.border,
				2)),
				u[3]=Math.sqrt(l(u[1],
				2)-l(this.border,
				2)),
				e=h+u[2]+u[3]+(a?0: u[0]),
				i=e/h,
				n=[d(i*s),
				d(i*r)],
				o?n: n.reverse()
			},
			_calculateTip: function(t,
			e,
			i){
				i=i||1,
				e=e||this.size;varn=e[0]*i,
				o=e[1]*i,
				s=Math.ceil(n/2),
				r=Math.ceil(o/2),
				a={
					br: [0,
					0,
					n,
					o,
					n,
					0],
					bl: [0,
					0,
					n,
					0,
					0,
					o],
					tr: [0,
					o,
					n,
					0,
					n,
					o],
					tl: [0,
					0,
					0,
					o,
					n,
					o],
					tc: [0,
					o,
					s,
					0,
					n,
					o],
					bc: [0,
					0,
					n,
					0,
					s,
					o],
					rc: [0,
					0,
					n,
					r,
					0,
					o],
					lc: [n,
					0,
					n,
					o,
					0,
					r]
				};returna.lt=a.br,
				a.rt=a.bl,
				a.lb=a.tr,
				a.rb=a.tl,
				a[t.abbrev()]
			},
			_drawCoords: function(t,
			e){
				t.beginPath(),
				t.moveTo(e[0],
				e[1]),
				t.lineTo(e[2],
				e[3]),
				t.lineTo(e[4],
				e[5]),
				t.closePath()
			},
			create: function(){
				vart=this.corner=(ht||tt.ie)&&this._parseCorner(this.options.corner);return(this.enabled=!!this.corner&&"c"!==this.corner.abbrev())&&(this.qtip.cache.corner=t.clone(),
				this.update()),
				this.element.toggle(this.enabled),
				this.corner
			},
			update: function(e,
			i){
				if(!this.enabled)returnthis;varo,
				s,
				r,
				a,
				c,
				l,
				d,
				h,
				u=this.qtip.elements,
				p=this.element,
				f=p.children(),
				m=this.options,
				g=this.size,
				v=m.mimic,
				b=Math.round;e||(e=this.qtip.cache.corner||this.corner),
				v===A?v=e: (v=newT(v),
				v.precedance=e.precedance,
				"inherit"===v.x?v.x=e.x: "inherit"===v.y?v.y=e.y: v.x===v.y&&(v[e.precedance]=e[e.precedance])),
				s=v.precedance,
				e.precedance===I?this._swapDimensions(): this._resetDimensions(),
				o=this.color=this._parseColours(e),
				o[1]!==lt?(h=this.border=this._parseWidth(e,
				e[e.precedance]),
				m.border&&1>h&&!ut.test(o[1])&&(o[0]=o[1]),
				this.border=h=m.border!==_?m.border: h): this.border=h=0,
				d=this.size=this._calculateSize(e),
				p.css({
					width: d[0],
					height: d[1],
					lineHeight: d[1]+"px"
				}),
				l=e.precedance===j?[b(v.x===q?h: v.x===N?d[0]-g[0]-h: (d[0]-g[0])/2),
				b(v.y===O?d[1]-g[1]: 0)]: [b(v.x===q?d[0]-g[0]: 0),
				b(v.y===O?h: v.y===M?d[1]-g[1]-h: (d[1]-g[1])/2)],
				ht?(r=f[0].getContext("2d"),
				r.restore(),
				r.save(),
				r.clearRect(0,
				0,
				6e3,
				6e3),
				a=this._calculateTip(v,
				g,
				vt),
				c=this._calculateTip(v,
				this.size,
				vt),
				f.attr(D,
				d[0]*vt).attr(R,
				d[1]*vt),
				f.css(D,
				d[0]).css(R,
				d[1]),
				this._drawCoords(r,
				c),
				r.fillStyle=o[1],
				r.fill(),
				r.translate(l[0]*vt,
				l[1]*vt),
				this._drawCoords(r,
				a),
				r.fillStyle=o[0],
				r.fill()): (a=this._calculateTip(v),
				a="m"+a[0]+","+a[1]+" l"+a[2]+","+a[3]+" "+a[4]+","+a[5]+" xe",
				l[2]=h&&/^(r|b)/i.test(e.string())?8===tt.ie?2: 1: 0,
				f.css({
					coordsize: d[0]+h+" "+(d[1]+h),
					antialias: ""+(v.string().indexOf(P)>-1),
					left: l[0]-l[2]*Number(s===I),
					top: l[1]-l[2]*Number(s===j),
					width: d[0]+h,
					height: d[1]+h
				}).each(function(t){
					vare=n(this);e[e.prop?"prop": "attr"]({
						coordsize: d[0]+h+" "+(d[1]+h),
						path: a,
						fillcolor: o[0],
						filled: !!t,
						stroked: !t
					}).toggle(!(!h&&!t)),
					!t&&e.html(bt("stroke",
					'weight="'+2*h+'px"color="'+o[1]+'"miterlimit="1000"joinstyle="miter"'))
				})),
				t.opera&&setTimeout(function(){
					u.tip.css({
						display: "inline-block",
						visibility: "visible"
					})
				},
				1),
				i!==A&&this.calculate(e,
				d)
			},
			calculate: function(t,
			e){
				if(!this.enabled)returnA;vari,
				o,
				s=this,
				r=this.qtip.elements,
				a=this.element,
				c=this.options.offset,
				l=(r.tooltip.hasClass("ui-widget"),
				{
					
				});returnt=t||this.corner,
				i=t.precedance,
				e=e||this._calculateSize(t),
				o=[t.x,
				t.y],
				i===I&&o.reverse(),
				n.each(o,
				function(n,
				o){
					vara,
					d,
					h;o===P?(a=i===j?q: O,
					l[a]="50%",
					l[st+"-"+a]=-Math.round(e[i===j?0: 1]/2)+c): (a=s._parseWidth(t,
					o,
					r.tooltip),
					d=s._parseWidth(t,
					o,
					r.content),
					h=s._parseRadius(t),
					l[o]=Math.max(-s.border,
					n?d: c+(h>a?h: -a)))
				}),
				l[t[i]]-=e[i===I?0: 1],
				a.css({
					margin: "",
					top: "",
					bottom: "",
					left: "",
					right: ""
				}).css(l),
				l
			},
			reposition: function(t,
			e,
			n,
			o){
				functions(t,
				e,
				i,
				n,
				o){
					t===F&&d.precedance===e&&h[n]&&d[i]!==P?d.precedance=d.precedance===I?j: I: t!==F&&h[n]&&(d[e]=d[e]===P?h[n]>0?n: o: d[e]===n?o: n)
				}functionr(t,
				e,
				o){
					d[t]===P?g[st+"-"+e]=m[t]=a[st+"-"+e]-h[e]: (c=a[o]!==i?[h[e],
					-a[e]]: [-h[e],
					a[e]],
					(m[t]=Math.max(c[0],
					c[1]))>c[0]&&(n[e]-=h[e],
					m[e]=A),
					g[a[o]!==i?o: e]=m[t])
				}if(this.enabled){
					vara,
					c,
					l=e.cache,
					d=this.corner.clone(),
					h=n.adjusted,
					u=e.options.position.adjust.method.split(" "),
					p=u[0],
					f=u[1]||u[0],
					m={
						left: A,
						top: A,
						x: 0,
						y: 0
					},
					g={
						
					};this.corner.fixed!==_&&(s(p,
					I,
					j,
					q,
					N),
					s(f,
					j,
					I,
					O,
					M),
					(d.string()!==l.corner.string()||l.cornerTop!==h.top||l.cornerLeft!==h.left)&&this.update(d,
					A)),
					a=this.calculate(d),
					a.right!==i&&(a.left=-a.right),
					a.bottom!==i&&(a.top=-a.bottom),
					a.user=this.offset,
					(m.left=p===F&&!!h.left)&&r(I,
					q,
					N),
					(m.top=f===F&&!!h.top)&&r(j,
					O,
					M),
					this.element.css(g).toggle(!(m.x&&m.y||d.x===P&&m.y||d.y===P&&m.x)),
					n.left-=a.left.charAt?a.user: p!==F||m.top||!m.left&&!m.top?a.left+this.border: 0,
					n.top-=a.top.charAt?a.user: f!==F||m.left||!m.left&&!m.top?a.top+this.border: 0,
					l.cornerLeft=h.left,
					l.cornerTop=h.top,
					l.corner=d.clone()
				}
			},
			destroy: function(){
				this.qtip._unbind(this.qtip.tooltip,
				this._ns),
				this.qtip.elements.tip&&this.qtip.elements.tip.find("*").remove().end().remove()
			}
		}),
		ot=z.tip=function(t){
			returnnewx(t,
			t.options.style.tip)
		},
		ot.initialize="render",
		ot.sanitize=function(t){
			if(t.style&&"tip"int.style){
				vare=t.style.tip;"object"!=typeofe&&(e=t.style.tip={
					corner: e
				}),
				/string|boolean/i.test(typeofe.corner)||(e.corner=_)
			}
		},
		S.tip={
			"^position.my|style.tip.(corner|mimic|border)$": function(){
				this.create(),
				this.qtip.reposition()
			},
			"^style.tip.(height|width)$": function(t){
				this.size=[t.width,
				t.height],
				this.update(),
				this.qtip.reposition()
			},
			"^content.title|style.(classes|widget)$": function(){
				this.update()
			}
		},
		n.extend(_,
		C.defaults,
		{
			style: {
				tip: {
					corner: _,
					mimic: A,
					width: 6,
					height: 6,
					border: _,
					offset: 0
				}
			}
		})
	})
}(window,
document),
+function(t){
	"use strict";t.fn.qtip&&(t.fn.qtip.defaults.position.my="bottom center",
	t.fn.qtip.defaults.position.at="top center")
}(window.jQuery),
+function(t){
	"use strict";functione(e){
		vari=t(this),
		n=i.data("tc.totop"),
		o="object"==typeofe&&e;n||i.data("tc.totop",
		n=news(this,
		o)),
		"string"==typeofe&&n[e].call(i)
	}vari,
	n=!1,
	o=!1,
	s=function(t,
	e){
		this.options=this.$element=null,
		this.init(t,
		e)
	};s.DEFAULTS={
		buttonText: {
			de: "Nach Oben",
			en: "To Top"
		},
		language: "auto",
		smallButton: !1,
		buttonOpacity: .92,
		scrollOffset: 50,
		scrollTimeMax: 800,
		scrollTimeMin: 250,
		pixelPerSecond: 4e3,
		mobileBreakpoint: 639,
		dynamicVisibility: !0,
		dynamicVisibilityTime: 2e3,
		theme: "",
		containerType: "container-fixed"
	},
	s.prototype.init=function(e,
	i){
		this.$element=t(e);this.options=this.mergeOptions(i),
		this.options.language&&"auto"!==this.options.language||(this.options.language=this.getDocumentLanguage());vars=this;t.support.mobile===!0&&(o=!0,
		this.options.dynamicVisibility=!1),
		o===!0||this.options.smallButton===!0||t(window).width()<this.options.mobileBreakpoint?this.generateButton(!0,
		!1): this.generateButton(!1,
		!1),
		this.showHideButton(),
		t(window).scroll(function(){
			s.showHideButton()
		}),
		t(window).resize(function(){
			vare=t(window).width();639>e?s.generateButton(!0,
			!0): e>640&&s.generateButton(!1,
			!0)
		}),
		t("body").mousemove(function(){
			n===!1&&(s.toggleButtonVisibility(!0),
			s.dynamicVisibility())
		})
	},
	s.prototype.mergeOptions=function(t){
		t=t.option;vare,
		i={
			
		},
		n=this.getDefaults();for(einn)i[e]=n[e];for(eint)i[e]=t[e];returni
	},
	s.prototype.showHideButton=function(){
		t(window).scrollTop()>this.options.scrollOffset&&n===!1?(n=!0,
		t(".totop").css({
			bottom: "0px",
			opacity: this.options.buttonOpacity
		}),
		this.dynamicVisibility()): t(window).scrollTop()<this.options.scrollOffset&&n===!0&&(n=!1,
		t(".totop").css({
			bottom: "-70px",
			opacity: 0
		}))
	},
	s.prototype.toggleButtonVisibility=function(e){
		e===!0?(n=!0,
		t(".totop").css({
			opacity: this.options.buttonOpacity
		})): e===!1&&(n=!1,
		t(".totop").css({
			opacity: 0
		}))
	},
	s.prototype.generateButton=function(e,
	n){
		varo=this,
		s=this.options,
		r="",
		a=this.options.buttonText[this.options.language],
		c='<buttontype="button"id="totopButton"class="btn btn-default btn-minimal"><iclass="icon icon-export"aria-hidden="true"></i>'+a+"</button>";e===!0&&(c='<buttontype="button"id="totopButton"class="btn btn-default btn-icon mobile"title="'+a+'"><iclass="icon icon-export"aria-hidden="true"></i></button>'),
		n===!0?(r=c,
		t("#totopButton").detach(),
		t("#button-wrap").append(r)): n===!1&&(r='<divclass="totop"><divclass="'+s.containerType+'"><divclass="row"><divid="button-wrap"class="col-12">'+c+"</div></div></div></div>",
		t("body").append(r)),
		s.theme&&t("#totopButton").addClass(s.theme),
		t("#totopButton").click(function(e){
			e.preventDefault();varn=t(window).scrollTop(),
			o=Math.round(1e3*(n/s.pixelPerSecond));o=Math.min(o,
			s.scrollTimeMax),
			o=Math.max(o,
			s.scrollTimeMin),
			t("html, body").stop(!0,
			!0).animate({
				scrollTop: 0
			},
			o),
			clearTimeout(i)
		}),
		t("#totopButton").mouseenter(function(t){
			clearTimeout(i)
		}),
		t("#totopButton").mouseleave(function(t){
			o.dynamicVisibility()
		})
	},
	s.prototype.dynamicVisibility=function(){
		vart=this;this.options.dynamicVisibility===!0&&(clearTimeout(i),
		i=setTimeout(function(){
			t.toggleButtonVisibility(!1),
			clearTimeout(i)
		},
		t.options.dynamicVisibilityTime))
	},
	s.prototype.getDocumentLanguage=function(){
		returnt("html").attr("lang")
	},
	s.prototype.getDefaults=function(){
		returns.DEFAULTS
	};varr=t.fn.totop;t.fn.totop=e,
	t.fn.totop.Constructor=s,
	t.fn.totop.noConflict=function(){
		returnt.fn.totop=r,
		this
	}
}(window.jQuery),
+function(t){
	"use strict";functione(e){
		returnthis.each(function(){
			varn=t(this),
			o=n.data("tc.button"),
			s="object"==typeofe&&e;o||n.data("tc.button",
			o=newi(this,
			s)),
			"toggleActiveState"==e&&o.setActiveState(),
			"toggleActiveStateRadioGroup"==e&&o.setActiveStateRadioGroup(!1),
			"toggleActiveStateGroup"==e&&o.setActiveStateGroup(),
			"forwardPressState"==e?o.callFunction(void0,
			"press"): e&&o.setNewState(e)
		})
	}vari=function(t,
	e){
		this.options=this.$element=null,
		this.buttonGroup=!1,
		this.init(t,
		e)
	};i.DEFAULTS={
		
	},
	i.prototype.init=function(e,
	i){
		varn=this.$element=t(e);n.hasClass("active")===!0&&this.$element.attr("aria-pressed",
		!0)
	},
	i.prototype.setActiveStateGroup=function(){
		this.buttonGroup=!0,
		this.setActiveState()
	},
	i.prototype.setActiveStateRadioGroup=function(e){
		this.buttonGroup=!0;vari=this.$element,
		n=i.parent(),
		o=t(i).index(),
		s=this;n.children("button").each(function(e){
			vari=t(this);e!=o&&!i.prop("disabled")&&i.hasClass("active")&&s.setActiveState(i,
			!0)
		}),
		i.hasClass("active")||this.setActiveState(i,
		!1)
	},
	i.prototype.setNewState=function(t){
		vare=this.$element;switch(t){
			case"default": this.setActiveState(e,
			!0),
			this.setDisableState(e,
			!0);break;case"active": this.setActiveState(e,
			!1);break;case"enable": this.setDisableState(e,
			!0);break;case"disable": this.setDisableState(e,
			!1);break;case"toggledisable": this.setDisableState();break;case"toggleactive": this.setActiveState()
		}
	},
	i.prototype.setDisableState=function(t,
	e){
		void0===t&&(t=this.$element),
		void0===e&&(e=t.prop("disabled")),
		e===!1?(t.prop("disabled",
		!0),
		this.setActiveState(t,
		!0),
		this.callFunction(t,
		"d")): e===!0&&(t.prop("disabled",
		!1),
		this.callFunction(t,
		"e"))
	},
	i.prototype.setActiveState=function(t,
	e){
		void0===t&&(t=this.$element),
		void0===e&&(e=t.hasClass("active")),
		this.$element.attr("aria-pressed",
		e?!1: !0),
		e===!1?(t.addClass("active"),
		this.callFunction(t,
		"active")): e===!0&&(t.removeClass("active"),
		t.blur(),
		this.callFunction(t,
		"inactive"))
	},
	i.prototype.callFunction=function(t,
	e){
		vari="",
		n="data-callback",
		o="data-callback-states";void0===t&&(t=this.$element);vars=t.attr(n);i=this.buttonGroup===!0?t.parent().attr(o): t.attr(o),
		void0!==s&&("press"===e?window[s](t,
		e): "all"===i&&window[s](t,
		e))
	};varn=t.fn.button;t.fn.button=e,
	t.fn.button.Constructor=i,
	t(document).on("click.tc.button.data-api",
	'[data-toggle="button"]',
	function(i){
		varn=t(i.target);e.call(n,
		"toggleActiveState"),
		e.call(n,
		"forwardPressState")
	}),
	t(document).on("click.tc.button.data-api",
	'[data-toggle="buttongroup-radio"]',
	function(i){
		varn=t(i.target);e.call(n,
		"toggleActiveStateRadioGroup"),
		e.call(n,
		"forwardPressState")
	}),
	t(document).on("click.tc.button.data-api",
	'[data-toggle="buttongroup"]',
	function(i){
		varn=t(i.target);e.call(n,
		"toggleActiveStateGroup"),
		e.call(n,
		"forwardPressState")
	}),
	t.fn.button.noConflict=function(){
		returnt.fn.button=n,
		this
	}
}(window.jQuery),
+function(t){
	"use strict";functione(e){
		returnthis.each(function(){
			vari=t(this),
			o=i.data("tc.expandable"),
			s="object"==typeofe&&e;o?"string"==typeofe&&o[e].call(i): i.data("tc.expandable",
			o=newn(this,
			s))
		})
	}vari=0,
	n=function(e,
	i){
		this.options=this.$element=t(e),
		this.init(e,
		i)
	};n.DEFAULTS={
		speed: 400,
		syncToSize: !1,
		state: !0,
		height: 0,
		group: void0,
		id: ""
	},
	n.prototype.init=function(e,
	n){
		varo=this.$element=t(e);this.options=this.mergeOptions(n);vars=this.options;s.group?s.id=s.group+"-"+i: s.id=i,
		i++,
		o.hasClass("expandable-hidden")===!0?(t(o).wrap('<divid="'+s.id+'"class="expanable-container expandable-hidden"></div>'),
		t(o).parent().css({
			height: 0,
			opacity: 0
		}),
		t(o).removeClass("expandable-hidden"),
		s.state=!1): (t(o).wrap('<divid="'+s.id+'"class="expanable-container"></div>'),
		s.state=!0),
		this.calculateHeight()
	},
	n.prototype.calculateHeight=function(){
		vare=this.$element,
		i=this.options,
		n=t(e).clone().attr("id",
		!1).css({
			display: "inline-block",
			position: "absolute",
			left: "-10000px",
			width: t(e).parent().innerWidth()
		});t("body").append(n),
		i.height=n.outerHeight(!0),
		n.remove()
	},
	n.prototype.visible=function(){
		vart=this.data("tc.expandable");t.options;t.setVisibility(this,
		!1)
	},
	n.prototype.hidden=function(){
		vart=this.data("tc.expandable");t.options;t.setVisibility(this,
		!0)
	},
	n.prototype.toggleVisibility=function(){
		vare=this.data("tc.expandable"),
		i=e.options;t(i.group).index();void0!==i.group?(t("."+i.group).each(function(n){
			i.id!=t(this).data("tc.expandable").options.id&&e.setVisibility(t(this),
			!0)
		}),
		e.setVisibility(this,
		!1)): e.setVisibility(this)
	},
	n.prototype.setVisibility=function(e,
	i){
		varn=e.data("tc.expandable"),
		o=n.options,
		s=0,
		r=t(e).parent();s=o.syncToSize===!0?1e3/o.speed*o.height: o.speed,
		void0===i&&(i=o.state),
		i===!0?(r.stop(!0,
		!1).animate({
			height: 0,
			opacity: 0
		},
		s,
		function(){
			r.addClass("expandable-hidden")
		}),
		o.state=!1): i===!1&&(r.removeClass("expandable-hidden"),
		r.stop(!0,
		!1).animate({
			height: o.height+"px",
			opacity: 1
		},
		s),
		o.state=!0)
	},
	n.prototype.getDefaults=function(){
		returnn.DEFAULTS
	},
	n.prototype.mergeOptions=function(t){
		t=t.option;vare,
		i={
			
		},
		n=this.getDefaults();for(einn)i[e]=n[e];for(eint)i[e]=t[e];returni
	};varo=t.fn.expandable;t.fn.expandable=e,
	t.fn.expandable.Constructor=n,
	t.fn.expandable.noConflict=function(){
		returnt.fn.expandable=o,
		this
	}
}(window.jQuery),
angular.module("citaApp.controllers").controller("ErrorController",
ErrorController),
angular.module("citaApp.controllers").controller("HelpController",
HelpController),
angular.module("citaApp.controllers").controller("MasterController",
MasterController),
angular.module("citaApp.services").factory("confirmService",
confirmService),
angular.module("citaApp.services").factory("errorService",
errorService),
angular.module("citaApp.services").factory("initService",
initService),
angular.module("citaApp.services").factory("messagesService",
messagesService),
angular.module("citaApp.services").factory("msisdnService",
msisdnService),
angular.module("citaApp.services").factory("productService",
productService),
angular.module("citaApp.services").factory("tanService",
tanService),
angular.module("citaApp.directives").directive("confirm",
confirm),
angular.module("citaApp.directives").directive("focusMe",
focusMe),
angular.module("citaApp.directives").directive("msisdn",
msisdn),
angular.module("citaApp.directives").directive("price",
price),
angular.module("citaApp.directives").directive("step",
step),
angular.module("citaApp.directives").directive("tan",
tan),
angular.module("citaApp.directives").directive("validateMinlength",
validateMinlength);//#sourceMappingURL=script.js.map