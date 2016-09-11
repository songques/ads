!function(e,
t,
n){
	"use strict";functionr(){
		functione(e,
		n){
			returnt.extend(Object.create(e),
			n)
		}functionn(e,
		t){
			varn=t.caseInsensitiveMatch,
			r={
				originalPath: e,
				regexp: e
			},
			a=r.keys=[];returne=e.replace(/([().])/g,
			"\\$1").replace(/(\/)?: (\w+)([\?\*])?/g,
			function(e,
			t,
			n,
			r){
				vari="?"===r?r: null,
				o="*"===r?r: null;returna.push({
					name: n,
					optional: !!i
				}),
				t=t||"",
				""+(i?"": t)+"(?:"+(i?t: "")+(o&&"(.+?)"||"([^/]+)")+(i||"")+")"+(i||"")
			}).replace(/([\/$\*])/g,
			"\\$1"),
			r.regexp=newRegExp("^"+e+"$",
			n?"i": ""),
			r
		}varr={
			
		};this.when=function(e,
		a){
			vari=t.copy(a);if(t.isUndefined(i.reloadOnSearch)&&(i.reloadOnSearch=!0),
			t.isUndefined(i.caseInsensitiveMatch)&&(i.caseInsensitiveMatch=this.caseInsensitiveMatch),
			r[e]=t.extend(i,
			e&&n(e,
			i)),
			e){
				varo="/"==e[e.length-1]?e.substr(0,
				e.length-1): e+"/";r[o]=t.extend({
					redirectTo: e
				},
				n(o,
				i))
			}returnthis
		},
		this.caseInsensitiveMatch=!1,
		this.otherwise=function(e){
			return"string"==typeofe&&(e={
				redirectTo: e
			}),
			this.when(null,
			e),
			this
		},
		this.$get=["$rootScope",
		"$location",
		"$routeParams",
		"$q",
		"$injector",
		"$templateRequest",
		"$sce",
		function(n,
		a,
		i,
		o,
		s,
		l,
		c){
			functionf(e,
			t){
				varn=t.keys,
				r={
					
				};if(!t.regexp)returnnull;vara=t.regexp.exec(e);if(!a)returnnull;for(vari=1,
				o=a.length;o>i;++i){
					vars=n[i-1],
					u=a[i];s&&u&&(r[s.name]=u)
				}returnr
			}functiond(e){
				varr=y.current;v=h(),
				m=v&&r&&v.$$route===r.$$route&&t.equals(v.pathParams,
				r.pathParams)&&!v.reloadOnSearch&&!$,
				m||!r&&!v||n.$broadcast("$routeChangeStart",
				v,
				r).defaultPrevented&&e&&e.preventDefault()
			}functionp(){
				vare=y.current,
				r=v;m?(e.params=r.params,
				t.copy(e.params,
				i),
				n.$broadcast("$routeUpdate",
				e)): (r||e)&&($=!1,
				y.current=r,
				r&&r.redirectTo&&(t.isString(r.redirectTo)?a.path(g(r.redirectTo,
				r.params)).search(r.params).replace(): a.url(r.redirectTo(r.pathParams,
				a.path(),
				a.search())).replace()),
				o.when(r).then(function(){
					if(r){
						vare,
						n,
						a=t.extend({
							
						},
						r.resolve);returnt.forEach(a,
						function(e,
						n){
							a[n]=t.isString(e)?s.get(e): s.invoke(e,
							null,
							null,
							n)
						}),
						t.isDefined(e=r.template)?t.isFunction(e)&&(e=e(r.params)): t.isDefined(n=r.templateUrl)&&(t.isFunction(n)&&(n=n(r.params)),
						t.isDefined(n)&&(r.loadedTemplateUrl=c.valueOf(n),
						e=l(n))),
						t.isDefined(e)&&(a.$template=e),
						o.all(a)
					}
				}).then(function(a){
					r==y.current&&(r&&(r.locals=a,
					t.copy(r.params,
					i)),
					n.$broadcast("$routeChangeSuccess",
					r,
					e))
				},
				function(t){
					r==y.current&&n.$broadcast("$routeChangeError",
					r,
					e,
					t)
				}))
			}functionh(){
				varn,
				i;returnt.forEach(r,
				function(r,
				o){
					!i&&(n=f(a.path(),
					r))&&(i=e(r,
					{
						params: t.extend({
							
						},
						a.search(),
						n),
						pathParams: n
					}),
					i.$$route=r)
				}),
				i||r[null]&&e(r[null],
				{
					params: {
						
					},
					pathParams: {
						
					}
				})
			}functiong(e,
			n){
				varr=[];returnt.forEach((e||"").split(":"),
				function(e,
				t){
					if(0===t)r.push(e);else{
						vara=e.match(/(\w+)(?: [?*])?(.*)/),
						i=a[1];r.push(n[i]),
						r.push(a[2]||""),
						deleten[i]
					}
				}),
				r.join("")
			}varv,
			m,
			$=!1,
			y={
				routes: r,
				reload: function(){
					$=!0,
					n.$evalAsync(function(){
						d(),
						p()
					})
				},
				updateParams: function(e){
					if(!this.current||!this.current.$$route)throwu("norout",
					"Tried updating route when with no current route");e=t.extend({
						
					},
					this.current.params,
					e),
					a.path(g(this.current.$$route.originalPath,
					e)),
					a.search(e)
				}
			};returnn.$on("$locationChangeStart",
			d),
			n.$on("$locationChangeSuccess",
			p),
			y
		}]
	}functiona(){
		this.$get=function(){
			return{
				
			}
		}
	}functioni(e,
	n,
	r){
		return{
			restrict: "ECA",
			terminal: !0,
			priority: 400,
			transclude: "element",
			link: function(a,
			i,
			o,
			s,
			u){
				functionl(){
					p&&(r.cancel(p),
					p=null),
					f&&(f.$destroy(),
					f=null),
					d&&(p=r.leave(d),
					p.then(function(){
						p=null
					}),
					d=null)
				}functionc(){
					varo=e.current&&e.current.locals,
					s=o&&o.$template;if(t.isDefined(s)){
						varc=a.$new(),
						p=e.current,
						v=u(c,
						function(e){
							r.enter(e,
							null,
							d||i).then(function(){
								!t.isDefined(h)||h&&!a.$eval(h)||n()
							}),
							l()
						});d=v,
						f=p.scope=c,
						f.$emit("$viewContentLoaded"),
						f.$eval(g)
					}elsel()
				}varf,
				d,
				p,
				h=o.autoscroll,
				g=o.onload||"";a.$on("$routeChangeSuccess",
				c),
				c()
			}
		}
	}functiono(e,
	t,
	n){
		return{
			restrict: "ECA",
			priority: -400,
			link: function(r,
			a){
				vari=n.current,
				o=i.locals;a.html(o.$template);vars=e(a.contents());if(i.controller){
					o.$scope=r;varu=t(i.controller,
					o);i.controllerAs&&(r[i.controllerAs]=u),
					a.data("$ngControllerController",
					u),
					a.children().data("$ngControllerController",
					u)
				}s(r)
			}
		}
	}vars=t.module("ngRoute",
	["ng"]).provider("$route",
	r),
	u=t.$$minErr("ngRoute");s.provider("$routeParams",
	a),
	s.directive("ngView",
	i),
	s.directive("ngView",
	o),
	i.$inject=["$route",
	"$anchorScroll",
	"$animate"],
	o.$inject=["$compile",
	"$controller",
	"$route"]
}(window,
window.angular),
function(e,
t,
n){
	"use strict";functionr(e){
		returnnull!=e&&""!==e&&"hasOwnProperty"!==e&&s.test("."+e)
	}functiona(e,
	a){
		if(!r(a))throwo("badmember",
		'Dottedmemberpath"@{0}"isinvalid.',
		a);for(vari=a.split("."),
		s=0,
		u=i.length;u>s&&t.isDefined(e);s++){
			varl=i[s];e=null!==e?e[l]: n
		}returne
	}functioni(e,
	n){
		n=n||{
			
		},
		t.forEach(n,
		function(e,
		t){
			deleten[t]
		});for(varrine)!e.hasOwnProperty(r)||"$"===r.charAt(0)&&"$"===r.charAt(1)||(n[r]=e[r]);returnn
	}varo=t.$$minErr("$resource"),
	s=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;t.module("ngResource",
	["ng"]).provider("$resource",
	function(){
		vare=/^https?: \/\/[^\/]*/,
		r=this;this.defaults={
			stripTrailingSlashes: !0,
			actions: {
				get: {
					method: "GET"
				},
				save: {
					method: "POST"
				},
				query: {
					method: "GET",
					isArray: !0
				},
				remove: {
					method: "DELETE"
				},
				"delete": {
					method: "DELETE"
				}
			}
		},
		this.$get=["$http",
		"$q",
		function(s,
		u){
			functionl(e){
				returnc(e,
				!0).replace(/%26/gi,
				"&").replace(/%3D/gi,
				"=").replace(/%2B/gi,
				"+")
			}functionc(e,
			t){
				returnencodeURIComponent(e).replace(/%40/gi,
				"@").replace(/%3A/gi,
				":").replace(/%24/g,
				"$").replace(/%2C/gi,
				",").replace(/%20/g,
				t?"%20": "+")
			}functionf(e,
			t){
				this.template=e,
				this.defaults=g({
					
				},
				r.defaults,
				t),
				this.urlParams={
					
				}
			}functiond(e,
			l,
			c,
			$){
				functiony(e,
				t){
					varn={
						
					};returnt=g({
						
					},
					l,
					t),
					h(t,
					function(t,
					r){
						m(t)&&(t=t()),
						n[r]=t&&t.charAt&&"@"==t.charAt(0)?a(e,
						t.substr(1)): t
					}),
					n
				}functionb(e){
					returne.resource
				}functionC(e){
					i(e||{
						
					},
					this)
				}varw=newf(e,
				$);returnc=g({
					
				},
				r.defaults.actions,
				c),
				C.prototype.toJSON=function(){
					vare=g({
						
					},
					this);returndeletee.$promise,
					deletee.$resolved,
					e
				},
				h(c,
				function(e,
				r){
					vara=/^(POST|PUT|PATCH)$/i.test(e.method);C[r]=function(l,
					c,
					f,
					d){
						var$,
						x,
						k,
						S={
							
						};switch(arguments.length){
							case4: k=d,
							x=f;case3: case2: if(!m(c)){
								S=l,
								$=c,
								x=f;break
							}if(m(l)){
								x=l,
								k=c;break
							}x=c,
							k=f;case1: m(l)?x=l: a?$=l: S=l;break;case0: break;default: throwo("badargs",
							"Expected up to 4 arguments [params, data, success, error], got {0} arguments",
							arguments.length)
						}varA=thisinstanceofC,
						D=A?$: e.isArray?[]: newC($),
						T={
							
						},
						E=e.interceptor&&e.interceptor.response||b,
						P=e.interceptor&&e.interceptor.responseError||n;h(e,
						function(e,
						t){
							"params"!=t&&"isArray"!=t&&"interceptor"!=t&&(T[t]=v(e))
						}),
						a&&(T.data=$),
						w.setUrlParams(T,
						g({
							
						},
						y($,
						e.params||{
							
						}),
						S),
						e.url);varj=s(T).then(function(n){
							vara=n.data,
							s=D.$promise;if(a){
								if(t.isArray(a)!==!!e.isArray)throwo("badcfg",
								"Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",
								r,
								e.isArray?"array": "object",
								t.isArray(a)?"array": "object",
								T.method,
								T.url);e.isArray?(D.length=0,
								h(a,
								function(e){
									"object"==typeofe?D.push(newC(e)): D.push(e)
								})): (i(a,
								D),
								D.$promise=s)
							}returnD.$resolved=!0,
							n.resource=D,
							n
						},
						function(e){
							returnD.$resolved=!0,
							(k||p)(e),
							u.reject(e)
						});returnj=j.then(function(e){
							vart=E(e);return(x||p)(t,
							e.headers),
							t
						},
						P),
						A?j: (D.$promise=j,
						D.$resolved=!1,
						D)
					},
					C.prototype["$"+r]=function(e,
					t,
					n){
						m(e)&&(n=t,
						t=e,
						e={
							
						});vara=C[r].call(this,
						e,
						this,
						t,
						n);returna.$promise||a
					}
				}),
				C.bind=function(t){
					returnd(e,
					g({
						
					},
					l,
					t),
					c)
				},
				C
			}varp=t.noop,
			h=t.forEach,
			g=t.extend,
			v=t.copy,
			m=t.isFunction;returnf.prototype={
				setUrlParams: function(n,
				r,
				a){
					vari,
					s,
					u=this,
					c=a||u.template,
					f="",
					d=u.urlParams={
						
					};h(c.split(/\W/),
					function(e){
						if("hasOwnProperty"===e)throwo("badname",
						"hasOwnProperty is not a valid parameter name.");!newRegExp("^\\d+$").test(e)&&e&&newRegExp("(^|[^\\\\]):"+e+"(\\W|$)").test(c)&&(d[e]=!0)
					}),
					c=c.replace(/\\: /g,
					":"),
					c=c.replace(e,
					function(e){
						returnf=e,
						""
					}),
					r=r||{
						
					},
					h(u.urlParams,
					function(e,
					n){
						i=r.hasOwnProperty(n)?r[n]: u.defaults[n],
						t.isDefined(i)&&null!==i?(s=l(i),
						c=c.replace(newRegExp(":"+n+"(\\W|$)",
						"g"),
						function(e,
						t){
							returns+t
						})): c=c.replace(newRegExp("(/?):"+n+"(\\W|$)",
						"g"),
						function(e,
						t,
						n){
							return"/"==n.charAt(0)?n: t+n
						})
					}),
					u.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,
					"")||"/"),
					c=c.replace(/\/\.(?=\w+($|\?))/,
					"."),
					n.url=f+c.replace(/\/\\\./,
					"/."),
					h(r,
					function(e,
					t){
						u.urlParams[t]||(n.params=n.params||{
							
						},
						n.params[t]=e)
					})
				}
			},
			d
		}]
	})
}(window,
window.angular),
function(e,
t,
n){
	"use strict";functionr(){
		functione(e,
		t,
		r,
		a){
			returnfunction(i,
			s,
			u){
				varl=u.$normalize(t);!n[l]||o(s,
				r)||u[l]||i.$watch(u[e],
				function(e){
					e=a?!e: !!e,
					s.attr(t,
					e)
				})
			}
		}varn={
			ariaHidden: !0,
			ariaChecked: !0,
			ariaDisabled: !0,
			ariaRequired: !0,
			ariaInvalid: !0,
			ariaMultiline: !0,
			ariaValue: !0,
			tabindex: !0,
			bindKeypress: !0,
			bindRoleForClick: !0
		};this.config=function(e){
			n=t.extend(n,
			e)
		},
		this.$get=function(){
			return{
				config: function(e){
					returnn[e]
				},
				$$watchExpr: e
			}
		}
	}vara=t.module("ngAria",
	["ng"]).provider("$aria",
	r),
	i=["BUTTON",
	"A",
	"INPUT",
	"TEXTAREA",
	"SELECT",
	"DETAILS",
	"SUMMARY"],
	o=function(e,
	t){
		return-1!==t.indexOf(e[0].nodeName)?!0: void0
	};a.directive("ngShow",
	["$aria",
	function(e){
		returne.$$watchExpr("ngShow",
		"aria-hidden",
		[],
		!0)
	}]).directive("ngHide",
	["$aria",
	function(e){
		returne.$$watchExpr("ngHide",
		"aria-hidden",
		[],
		!1)
	}]).directive("ngModel",
	["$aria",
	function(e){
		functiont(t,
		n,
		r){
			returne.config(n)&&!r.attr(t)
		}functionn(e,
		t){
			return!t.attr("role")&&t.attr("type")===e&&"INPUT"!==t[0].nodeName
		}functionr(e,
		t){
			varn=e.type,
			r=e.role;return"checkbox"===(n||r)||"menuitemcheckbox"===r?"checkbox": "radio"===(n||r)||"menuitemradio"===r?"radio": "range"===n||"progressbar"===r||"slider"===r?"range": "textbox"===(n||r)||"TEXTAREA"===t[0].nodeName?"multiline": ""
		}return{
			restrict: "A",
			require: "?ngModel",
			priority: 200,
			compile: function(a,
			i){
				varo=r(i,
				a);return{
					pre: function(e,
					t,
					n,
					r){
						"checkbox"===o&&"checkbox"!==n.type&&(r.$isEmpty=function(e){
							returne===!1
						})
					},
					post: function(r,
					a,
					i,
					s){
						functionu(){
							returns.$modelValue
						}functionl(){
							returnf?(f=!1,
							function(e){
								vart=i.value==s.$viewValue;a.attr("aria-checked",
								t),
								a.attr("tabindex",
								0-!t)
							}): function(e){
								a.attr("aria-checked",
								i.value==s.$viewValue)
							}
						}functionc(){
							a.attr("aria-checked",
							!s.$isEmpty(s.$viewValue))
						}varf=t("tabindex",
						"tabindex",
						a);switch(o){
							case"radio": case"checkbox": n(o,
							a)&&a.attr("role",
							o),
							t("aria-checked",
							"ariaChecked",
							a)&&r.$watch(u,
							"radio"===o?l(): c),
							f&&a.attr("tabindex",
							0);break;case"range": if(n(o,
							a)&&a.attr("role",
							"slider"),
							e.config("ariaValue")){
								vard=!a.attr("aria-valuemin")&&(i.hasOwnProperty("min")||i.hasOwnProperty("ngMin")),
								p=!a.attr("aria-valuemax")&&(i.hasOwnProperty("max")||i.hasOwnProperty("ngMax")),
								h=!a.attr("aria-valuenow");d&&i.$observe("min",
								function(e){
									a.attr("aria-valuemin",
									e)
								}),
								p&&i.$observe("max",
								function(e){
									a.attr("aria-valuemax",
									e)
								}),
								h&&r.$watch(u,
								function(e){
									a.attr("aria-valuenow",
									e)
								})
							}f&&a.attr("tabindex",
							0);break;case"multiline": t("aria-multiline",
							"ariaMultiline",
							a)&&a.attr("aria-multiline",
							!0)
						}s.$validators.required&&t("aria-required",
						"ariaRequired",
						a)&&r.$watch(function(){
							returns.$error.required
						},
						function(e){
							a.attr("aria-required",
							!!e)
						}),
						t("aria-invalid",
						"ariaInvalid",
						a)&&r.$watch(function(){
							returns.$invalid
						},
						function(e){
							a.attr("aria-invalid",
							!!e)
						})
					}
				}
			}
		}
	}]).directive("ngDisabled",
	["$aria",
	function(e){
		returne.$$watchExpr("ngDisabled",
		"aria-disabled",
		[])
	}]).directive("ngMessages",
	function(){
		return{
			restrict: "A",
			require: "?ngMessages",
			link: function(e,
			t,
			n,
			r){
				t.attr("aria-live")||t.attr("aria-live",
				"assertive")
			}
		}
	}).directive("ngClick",
	["$aria",
	"$parse",
	function(e,
	t){
		return{
			restrict: "A",
			compile: function(n,
			r){
				vara=t(r.ngClick,
				null,
				!0);returnfunction(t,
				n,
				r){
					o(n,
					i)||(e.config("bindRoleForClick")&&!n.attr("role")&&n.attr("role",
					"button"),
					e.config("tabindex")&&!n.attr("tabindex")&&n.attr("tabindex",
					0),
					e.config("bindKeypress")&&!r.ngKeypress&&n.on("keypress",
					function(e){
						functionn(){
							a(t,
							{
								$event: e
							})
						}varr=e.which||e.keyCode;(32===r||13===r)&&t.$apply(n)
					}))
				}
			}
		}
	}]).directive("ngDblclick",
	["$aria",
	function(e){
		returnfunction(t,
		n,
		r){
			!e.config("tabindex")||n.attr("tabindex")||o(n,
			i)||n.attr("tabindex",
			0)
		}
	}])
}(window,
window.angular),
function(e,
t,
n){
	"use strict";functionr(){
		this.$get=["$$sanitizeUri",
		function(e){
			returnfunction(t){
				varn=[];returno(t,
				l(n,
				function(t,
				n){
					return!/^unsafe/.test(e(t,
					n))
				})),
				n.join("")
			}
		}]
	}functiona(e){
		varn=[],
		r=l(n,
		t.noop);returnr.chars(e),
		n.join("")
	}functioni(e,
	n){
		varr,
		a={
			
		},
		i=e.split(",");for(r=0;r<i.length;r++)a[n?t.lowercase(i[r]): i[r]]=!0;returna
	}functiono(e,
	n){
		functionr(e,
		r,
		i,
		o){
			if(r=t.lowercase(r),
			S[r])for(;y.last()&&A[y.last()];)a("",
			y.last());k[r]&&y.last()==r&&a("",
			r),
			o=C[r]||!!o,
			o||y.push(r);varu={
				
			};i.replace(p,
			function(e,
			t,
			n,
			r,
			a){
				vari=n||r||a||"";u[t]=s(i)
			}),
			n.start&&n.start(r,
			u,
			o)
		}functiona(e,
		r){
			vara,
			i=0;if(r=t.lowercase(r))for(i=y.length-1;i>=0&&y[i]!=r;i--);if(i>=0){
				for(a=y.length-1;a>=i;a--)n.end&&n.end(y[a]);y.length=i
			}
		}"string"!=typeofe&&(e=null===e||"undefined"==typeofe?"": ""+e);vari,
		o,
		u,
		l,
		y=[],
		b=e;for(y.last=function(){
			returny[y.length-1]
		};e;){
			if(l="",
			o=!0,
			y.last()&&T[y.last()]?(e=e.replace(newRegExp("([\\W\\w]*)<\\s*\\/\\s*"+y.last()+"[^>]*>",
			"i"),
			function(e,
			t){
				returnt=t.replace(v,
				"$1").replace($,
				"$1"),
				n.chars&&n.chars(s(t)),
				""
			}),
			a("",
			y.last())): (0===e.indexOf("<!--")?(i=e.indexOf("--",
			4),
			i>=0&&e.lastIndexOf("-->",
			i)===i&&(n.comment&&n.comment(e.substring(4,
			i)),
			e=e.substring(i+3),
			o=!1)): m.test(e)?(u=e.match(m),
			u&&(e=e.replace(u[0],
			""),
			o=!1)): g.test(e)?(u=e.match(d),
			u&&(e=e.substring(u[0].length),
			u[0].replace(d,
			a),
			o=!1)): h.test(e)&&(u=e.match(f),
			u?(u[4]&&(e=e.substring(u[0].length),
			u[0].replace(f,
			r)),
			o=!1): (l+="<",
			e=e.substring(1))),
			o&&(i=e.indexOf("<"),
			l+=0>i?e: e.substring(0,
			i),
			e=0>i?"": e.substring(i),
			n.chars&&n.chars(s(l)))),
			e==b)throwc("badparse",
			"The sanitizer was unable to parse the following block of html: {0}",
			e);b=e
		}a()
	}functions(e){
		returne?(L.innerHTML=e.replace(/</g,
		"&lt;"),
		L.textContent): ""
	}functionu(e){
		returne.replace(/&/g,
		"&amp;").replace(y,
		function(e){
			vart=e.charCodeAt(0),
			n=e.charCodeAt(1);return"&#"+(1024*(t-55296)+(n-56320)+65536)+";"
		}).replace(b,
		function(e){
			return"&#"+e.charCodeAt(0)+";"
		}).replace(/</g,
		"&lt;").replace(/>/g,
		"&gt;")
	}functionl(e,
	n){
		varr=!1,
		a=t.bind(e,
		e.push);return{
			start: function(e,
			i,
			o){
				e=t.lowercase(e),
				!r&&T[e]&&(r=e),
				r||E[e]!==!0||(a("<"),
				a(e),
				t.forEach(i,
				function(r,
				i){
					varo=t.lowercase(i),
					s="img"===e&&"src"===o||"background"===o;N[o]!==!0||P[o]===!0&&!n(r,
					s)||(a(" "),
					a(i),
					a('="'),a(u(r)),a('"'))
				}),
				a(o?"/>": ">"))
			},
			end: function(e){
				e=t.lowercase(e),
				r||E[e]!==!0||(a("</"),
				a(e),
				a(">")),
				e==r&&(r=!1)
			},
			chars: function(e){
				r||a(u(e))
			}
		}
	}varc=t.$$minErr("$sanitize"),
	f=/^<((?: [a-zA-Z])[\w: -]*)((?: \s+[\w: -]+(?: \s*=\s*(?: (?: "[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,d=/^<\/\s*([\w:-]+)[^>]*>/,p=/([\w:-]+)(?:\s*=\s*(?:(?:"((?: [^"])*)")|(?: '((?: [^'])*)')|([^>\s]+)))?/g,
	h=/^</,
	g=/^<\//,
	v=/<!--(.*?)-->/g,
	m=/<!DOCTYPE([^>]*?)>/i,
	$=/<!\[CDATA\[(.*?)]]>/g,
	y=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
	b=/([^\#-~||!])/g,
	C=i("area,br,col,hr,img,wbr"),
	w=i("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
	x=i("rp,rt"),
	k=t.extend({
		
	},
	x,
	w),
	S=t.extend({
		
	},
	w,
	i("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
	A=t.extend({
		
	},
	x,
	i("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
	D=i("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan,use"),
	T=i("script,style"),
	E=t.extend({
		
	},
	C,
	S,
	A,
	k,
	D),
	P=i("background,cite,href,longdesc,src,usemap,xlink:href"),
	j=i("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
	O=i("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
	!0),
	N=t.extend({
		
	},
	P,
	O,
	j),
	L=document.createElement("pre");t.module("ngSanitize",
	[]).provider("$sanitize",
	r),
	t.module("ngSanitize").filter("linky",
	["$sanitize",
	function(e){
		varn=/((ftp|https?): \/\/|(www\.)|(mailto: )?[A-Za-z0-9._%+-]+@)\S*[^\s.;,
		(){
			
		}<>"\u201d\u2019]/i,r=/^mailto:/i;return function(i,o){function s(e){e&&p.push(a(e))}function u(e,n){p.push("<a"),t.isDefined(o)&&p.push('target="',
		o,
		'" '),p.push('href="',
		e.replace(/"/g,"&quot;"),'">'),
		s(n),
		p.push("</a>")
	}if(!i)returni;for(varl,
	c,
	f,
	d=i,
	p=[];l=d.match(n);)c=l[0],
	l[2]||l[4]||(c=(l[3]?"http://": "mailto:")+c),
	f=l.index,
	s(d.substr(0,
	f)),
	u(c,
	l[0].replace(r,
	"")),
	d=d.substring(f+l[0].length);returns(d),
	e(p.join(""))
}
}])
}(window,
window.angular),
function(e,
t,
n){
"use strict";functionr(e){
returnt.lowercase(e.nodeName||e[0]&&e[0].nodeName)
}functiona(e,
n,
r){
i.directive(e,
["$parse",
"$swipe",
function(a,
i){
	varo=75,
	s=.3,
	u=30;returnfunction(l,
	c,
	f){
		functiond(e){
			if(!p)return!1;vart=Math.abs(e.y-p.y),
			r=(e.x-p.x)*n;returnh&&o>t&&r>0&&r>u&&s>t/r
		}varp,
		h,
		g=a(f[e]),
		v=["touch"];t.isDefined(f.ngSwipeDisableMouse)||v.push("mouse"),
		i.bind(c,
		{
			start: function(e,
			t){
				p=e,
				h=!0
			},
			cancel: function(e){
				h=!1
			},
			end: function(e,
			t){
				d(e)&&l.$apply(function(){
					c.triggerHandler(r),
					g(l,
					{
						$event: t
					})
				})
			}
		},
		v)
	}
}])
}vari=t.module("ngTouch",
[]);i.factory("$swipe",
[function(){
functione(e){
	vart=e.originalEvent||e,
	n=t.touches&&t.touches.length?t.touches: [t],
	r=t.changedTouches&&t.changedTouches[0]||n[0];return{
		x: r.clientX,
		y: r.clientY
	}
}functionn(e,
n){
	varr=[];returnt.forEach(e,
	function(e){
		vart=a[e][n];t&&r.push(t)
	}),
	r.join(" ")
}varr=10,
a={
	mouse: {
		start: "mousedown",
		move: "mousemove",
		end: "mouseup"
	},
	touch: {
		start: "touchstart",
		move: "touchmove",
		end: "touchend",
		cancel: "touchcancel"
	}
};return{
	bind: function(t,
	a,
	i){
		varo,
		s,
		u,
		l,
		c=!1;i=i||["mouse",
		"touch"],
		t.on(n(i,
		"start"),
		function(t){
			u=e(t),
			c=!0,
			o=0,
			s=0,
			l=u,
			a.start&&a.start(u,
			t)
		});varf=n(i,
		"cancel");f&&t.on(f,
		function(e){
			c=!1,
			a.cancel&&a.cancel(e)
		}),
		t.on(n(i,
		"move"),
		function(t){
			if(c&&u){
				varn=e(t);if(o+=Math.abs(n.x-l.x),
				s+=Math.abs(n.y-l.y),
				l=n,
				!(r>o&&r>s))returns>o?(c=!1,
				void(a.cancel&&a.cancel(t))): (t.preventDefault(),
				void(a.move&&a.move(n,
				t)))
			}
		}),
		t.on(n(i,
		"end"),
		function(t){
			c&&(c=!1,
			a.end&&a.end(e(t),
			t))
		})
	}
}
}]),
i.config(["$provide",
function(e){
e.decorator("ngClickDirective",
["$delegate",
function(e){
	returne.shift(),
	e
}])
}]),
i.directive("ngClick",
["$parse",
"$timeout",
"$rootElement",
function(e,
n,
a){
functioni(e,
t,
n,
r){
	returnMath.abs(e-n)<v&&Math.abs(t-r)<v
}functiono(e,
t,
n){
	for(varr=0;r<e.length;r+=2)if(i(e[r],
	e[r+1],
	t,
	n))returne.splice(r,
	r+2),
	!0;return!1
}functions(e){
	if(!(Date.now()-c>g)){
		vart=e.touches&&e.touches.length?e.touches: [e],
		n=t[0].clientX,
		a=t[0].clientY;1>n&&1>a||d&&d[0]===n&&d[1]===a||(d&&(d=null),
		"label"===r(e.target)&&(d=[n,
		a]),
		o(f,
		n,
		a)||(e.stopPropagation(),
		e.preventDefault(),
		e.target&&e.target.blur&&e.target.blur()))
	}
}functionu(e){
	vart=e.touches&&e.touches.length?e.touches: [e],
	r=t[0].clientX,
	a=t[0].clientY;f.push(r,
	a),
	n(function(){
		for(vare=0;e<f.length;e+=2)if(f[e]==r&&f[e+1]==a)returnvoidf.splice(e,
		e+2)
	},
	g,
	!1)
}functionl(e,
t){
	f||(a[0].addEventListener("click",
	s,
	!0),
	a[0].addEventListener("touchstart",
	u,
	!0),
	f=[]),
	c=Date.now(),
	o(f,
	e,
	t)
}varc,
f,
d,
p=750,
h=12,
g=2500,
v=25,
m="ng-click-active";returnfunction(n,
r,
a){
	functioni(){
		d=!1,
		r.removeClass(m)
	}varo,
	s,
	u,
	c,
	f=e(a.ngClick),
	d=!1;r.on("touchstart",
	function(e){
		d=!0,
		o=e.target?e.target: e.srcElement,
		3==o.nodeType&&(o=o.parentNode),
		r.addClass(m),
		s=Date.now();vart=e.originalEvent||e,
		n=t.touches&&t.touches.length?t.touches: [t],
		a=n[0];u=a.clientX,
		c=a.clientY
	}),
	r.on("touchcancel",
	function(e){
		i()
	}),
	r.on("touchend",
	function(e){
		varn=Date.now()-s,
		f=e.originalEvent||e,
		g=f.changedTouches&&f.changedTouches.length?f.changedTouches: f.touches&&f.touches.length?f.touches: [f],
		v=g[0],
		m=v.clientX,
		$=v.clientY,
		y=Math.sqrt(Math.pow(m-u,
		2)+Math.pow($-c,
		2));d&&p>n&&h>y&&(l(m,
		$),
		o&&o.blur(),
		t.isDefined(a.disabled)&&a.disabled!==!1||r.triggerHandler("click",
		[e])),
		i()
	}),
	r.onclick=function(e){
		
	},
	r.on("click",
	function(e,
	t){
		n.$apply(function(){
			f(n,
			{
				$event: t||e
			})
		})
	}),
	r.on("mousedown",
	function(e){
		r.addClass(m)
	}),
	r.on("mousemove mouseup",
	function(e){
		r.removeClass(m)
	})
}
}]),
a("ngSwipeLeft",
-1,
"swipeleft"),
a("ngSwipeRight",
1,
"swiperight")
}(window,
window.angular),
function(e,
t,
n){
"use strict";functionr(e,
t,
n){
if(!e)throwngMinErr("areq",
"Argument '{0}' is {1}",
t||"?",
n||"required");returne
}functiona(e,
t){
returne||t?e?t?(U(e)&&(e=e.join(" ")),
U(t)&&(t=t.join(" ")),
e+" "+t): e: t: ""
}functioni(e){
vart={
	
};returne&&(e.to||e.from)&&(t.to=e.to,
t.from=e.from),
t
}functiono(e,
t,
n){
varr="";returne=U(e)?e: e&&V(e)&&e.length?e.split(/\s+/): [],
_(e,
function(e,
a){
	e&&e.length>0&&(r+=a>0?" ": "",
	r+=n?t+e: e+t)
}),
r
}functions(e,
t){
varn=e.indexOf(t);t>=0&&e.splice(n,
1)
}functionu(e){
if(einstanceofq)switch(e.length){
	case0: return[];case1: if(e[0].nodeType===G)returne;break;default: returnq(l(e))
}returne.nodeType===G?q(e): void0
}functionl(e){
if(!e[0])returne;for(vart=0;t<e.length;t++){
	varn=e[t];if(n.nodeType==G)returnn
}
}functionc(e,
t,
n){
_(t,
function(t){
	e.addClass(t,
	n)
})
}functionf(e,
t,
n){
_(t,
function(t){
	e.removeClass(t,
	n)
})
}functiond(e){
returnfunction(t,
n){
	n.addClass&&(c(e,
	t,
	n.addClass),
	n.addClass=null),
	n.removeClass&&(f(e,
	t,
	n.removeClass),
	n.removeClass=null)
}
}functionp(e){
if(e=e||{
	
},
!e.$$prepared){
	vart=e.domOperation||M;e.domOperation=function(){
		e.$$domOperationFired=!0,
		t(),
		t=M
	},
	e.$$prepared=!0
}returne
}functionh(e,
t){
g(e,
t),
v(e,
t)
}functiong(e,
t){
t.from&&(e.css(t.from),
t.from=null)
}functionv(e,
t){
t.to&&(e.css(t.to),
t.to=null)
}functionm(e,
t,
n){
varr=(t.addClass||"")+" "+(n.addClass||""),
a=(t.removeClass||"")+" "+(n.removeClass||""),
i=$(e.attr("class"),
r,
a);n.preparationClasses&&(t.preparationClasses=S(n.preparationClasses,
t.preparationClasses),
deleten.preparationClasses);varo=t.domOperation!==M?t.domOperation: null;returnz(t,
n),
o&&(t.domOperation=o),
i.addClass?t.addClass=i.addClass: t.addClass=null,
i.removeClass?t.removeClass=i.removeClass: t.removeClass=null,
t
}function$(e,
t,
n){
functionr(e){
	V(e)&&(e=e.split(" "));vart={
		
	};return_(e,
	function(e){
		e.length&&(t[e]=!0)
	}),
	t
}vara=1,
i=-1,
o={
	
};e=r(e),
t=r(t),
_(t,
function(e,
t){
	o[t]=a
}),
n=r(n),
_(n,
function(e,
t){
	o[t]=o[t]===a?null: i
});vars={
	addClass: "",
	removeClass: ""
};return_(o,
function(t,
n){
	varr,
	o;t===a?(r="addClass",
	o=!e[n]): t===i&&(r="removeClass",
	o=e[n]),
	o&&(s[r].length&&(s[r]+=" "),
	s[r]+=n)
}),
s
}functiony(e){
returneinstanceoft.element?e[0]: e
}functionb(e,
t,
n){
varr="";t&&(r=o(t,
Z,
!0)),
n.addClass&&(r=S(r,
o(n.addClass,
X))),
n.removeClass&&(r=S(r,
o(n.removeClass,
J))),
r.length&&(n.preparationClasses=r,
e.addClass(r))
}functionC(e,
t){
t.preparationClasses&&(e.removeClass(t.preparationClasses),
t.preparationClasses=null),
t.activeClasses&&(e.removeClass(t.activeClasses),
t.activeClasses=null)
}functionw(e,
t){
varn=t?"-"+t+"s": "";returnk(e,
[de,
n]),
[de,
n]
}functionx(e,
t){
varn=t?"paused": "",
r=I+ue;returnk(e,
[r,
n]),
[r,
n]
}functionk(e,
t){
varn=t[0],
r=t[1];e.style[n]=r
}functionS(e,
t){
returne?t?e+" "+t: e: t
}functionA(e){
return[fe,
e+"s"]
}functionD(e,
t){
varn=t?ce: de;return[n,
e+"s"]
}functionT(e,
t,
n){
varr=Object.create(null),
a=e.getComputedStyle(t)||{
	
};return_(n,
function(e,
t){
	varn=a[e];if(n){
		vari=n.charAt(0);("-"===i||"+"===i||i>=0)&&(n=E(n)),
		0===n&&(n=null),
		r[t]=n
	}
}),
r
}functionE(e){
vart=0,
n=e.split(/\s*,
\s*/);return_(n,
function(e){
	"s"==e.charAt(e.length-1)&&(e=e.substring(0,
	e.length-1)),
	e=parseFloat(e)||0,
	t=t?Math.max(e,
	t): e
}),
t
}functionP(e){
return0===e||null!=e
}functionj(e,
t){
varn=L,
r=e+"s";returnt?n+=re: r+=" linear all",
[n,
r]
}functionO(){
vare=Object.create(null);return{
	flush: function(){
		e=Object.create(null)
	},
	count: function(t){
		varn=e[t];returnn?n.total: 0
	},
	get: function(t){
		varn=e[t];returnn&&n.value
	},
	put: function(t,
	n){
		e[t]?e[t].total++: e[t]={
			total: 1,
			value: n
		}
	}
}
}functionN(e,
t,
n){
_(n,
function(n){
	e[n]=B(e[n])?e[n]: t.style.getPropertyValue(n)
})
}varL,
F,
I,
R,
M=t.noop,
z=t.extend,
q=t.element,
_=t.forEach,
U=t.isArray,
V=t.isString,
H=t.isObject,
K=t.isUndefined,
B=t.isDefined,
W=t.isFunction,
Y=t.isElement,
G=1,
X="-add",
J="-remove",
Z="ng-",
Q="-active",
ee="ng-animate",
te="$$ngAnimateChildren",
ne="";K(e.ontransitionend)&&B(e.onwebkittransitionend)?(ne="-webkit-",
L="WebkitTransition",
F="webkitTransitionEnd transitionend"): (L="transition",
F="transitionend"),
K(e.onanimationend)&&B(e.onwebkitanimationend)?(ne="-webkit-",
I="WebkitAnimation",
R="webkitAnimationEnd animationend"): (I="animation",
R="animationend");varre="Duration",
ae="Property",
ie="Delay",
oe="TimingFunction",
se="IterationCount",
ue="PlayState",
le=9999,
ce=I+ie,
fe=I+re,
de=L+ie,
pe=L+re,
he=["$$rAF",
function(e){
functiont(e){
	r=r.concat(e),
	n()
}functionn(){
	if(r.length){
		for(vart=r.shift(),
		i=0;i<t.length;i++)t[i]();a||e(function(){
			a||n()
		})
	}
}varr,
a;returnr=t.queue=[],
t.waitUntilQuiet=function(t){
	a&&a(),
	a=e(function(){
		a=null,
		t(),
		n()
	})
},
t
}],
ge=[function(){
returnfunction(e,
n,
r){
	vara=r.ngAnimateChildren;t.isString(a)&&0===a.length?n.data(te,
	!0): r.$observe("ngAnimateChildren",
	function(e){
		e="on"===e||"true"===e,
		n.data(te,
		e)
	})
}
}],
ve="$$animateCss",
me=1e3,
$e=3,
ye=1.5,
be={
transitionDuration: pe,
transitionDelay: de,
transitionProperty: L+ae,
animationDuration: fe,
animationDelay: ce,
animationIterationCount: I+se
},
Ce={
transitionDuration: pe,
transitionDelay: de,
animationDuration: fe,
animationDelay: ce
},
we=["$animateProvider",
function(e){
vart=O(),
n=O();this.$get=["$window",
"$$jqLite",
"$$AnimateRunner",
"$timeout",
"$$forceReflow",
"$sniffer",
"$$rAFScheduler",
"$animate",
function(e,
r,
a,
u,
l,
c,
f,
m){
	function$(e,
	t){
		varn="$$ngAnimateParentKey",
		r=e.parentNode,
		a=r[n]||(r[n]=++z);returna+"-"+e.getAttribute("class")+"-"+t
	}functionb(n,
	r,
	a,
	i){
		varo=t.get(a);returno||(o=T(e,
		n,
		i),
		"infinite"===o.animationIterationCount&&(o.animationIterationCount=1)),
		t.put(a,
		o),
		o
	}functionC(a,
	i,
	s,
	u){
		varl;if(t.count(s)>0&&(l=n.get(s),
		!l)){
			varc=o(i,
			"-stagger");r.addClass(a,
			c),
			l=T(e,
			a,
			u),
			l.animationDuration=Math.max(l.animationDuration,
			0),
			l.transitionDuration=Math.max(l.transitionDuration,
			0),
			r.removeClass(a,
			c),
			n.put(s,
			l)
		}returnl||{
			
		}
	}functionS(e){
		q.push(e),
		f.waitUntilQuiet(function(){
			t.flush(),
			n.flush();for(vare=l(),
			r=0;r<q.length;r++)q[r](e);q.length=0
		})
	}functionE(e,
	t,
	n){
		varr=b(e,
		t,
		n,
		be),
		a=r.animationDelay,
		i=r.transitionDelay;returnr.maxDelay=a&&i?Math.max(a,
		i): a||i,
		r.maxDuration=Math.max(r.animationDuration*r.animationIterationCount,
		r.transitionDuration),
		r
	}varO=d(r),
	z=0,
	q=[];returnfunction(e,
	n){
		functionl(){
			d()
		}functionf(){
			d(!0)
		}functiond(t){
			H||B&&K||(H=!0,
			K=!1,
			n.$$skipPreparationClasses||r.removeClass(e,
			pe),
			r.removeClass(e,
			ge),
			x(V,
			!1),
			w(V,
			!1),
			_(re,
			function(e){
				V.style[e[0]]=""
			}),
			O(e,
			n),
			h(e,
			n),
			Object.keys(q).length&&_(q,
			function(e,
			t){
				e?V.style.setProperty(t,
				e): V.style.removeProperty(t)
			}),
			n.onDone&&n.onDone(),
			W&&W.complete(!t))
		}functionb(e){
			Le.blockTransition&&w(V,
			e),
			Le.blockKeyframeAnimation&&x(V,
			!!e)
		}functionT(){
			returnW=newa({
				end: l,
				cancel: f
			}),
			S(M),
			d(),
			{
				$$willAnimate: !1,
				start: function(){
					returnW
				},
				end: l
			}
		}functionz(){
			functiont(){
				if(!H){
					if(b(!1),
					_(re,
					function(e){
						vart=e[0],
						n=e[1];V.style[t]=n
					}),
					O(e,
					n),
					r.addClass(e,
					ge),
					Le.recalculateTimingStyles){
						if(he=V.className+" "+pe,
						xe=$(V,
						he),
						Oe=E(V,
						he,
						xe),
						Ne=Oe.maxDelay,
						G=Math.max(Ne,
						0),
						te=Oe.maxDuration,
						0===te)returnvoidd();Le.hasTransitions=Oe.transitionDuration>0,
						Le.hasAnimations=Oe.animationDuration>0
					}if(Le.applyAnimationDelay&&(Ne="boolean"!=typeofn.delay&&P(n.delay)?parseFloat(n.delay): Ne,
					G=Math.max(Ne,
					0),
					Oe.animationDelay=Ne,
					Fe=D(Ne,
					!0),
					re.push(Fe),
					V.style[Fe[0]]=Fe[1]),
					ee=G*me,
					ne=te*me,
					n.easing){
						vart,
						s=n.easing;Le.hasTransitions&&(t=L+oe,
						re.push([t,
						s]),
						V.style[t]=s),
						Le.hasAnimations&&(t=I+oe,
						re.push([t,
						s]),
						V.style[t]=s)
					}Oe.transitionDuration&&l.push(F),
					Oe.animationDuration&&l.push(R),
					o=Date.now();varc=ee+ye*ne,
					f=o+c,
					p=e.data(ve)||[],
					h=!0;if(p.length){
						varg=p[0];h=f>g.expectedEndTime,
						h?u.cancel(g.timer): p.push(d)
					}if(h){
						varm=u(a,
						c,
						!1);p[0]={
							timer: m,
							expectedEndTime: f
						},
						p.push(d),
						e.data(ve,
						p)
					}e.on(l.join(" "),
					i),
					n.to&&(n.cleanupStyles&&N(q,
					V,
					Object.keys(n.to)),
					v(e,
					n))
				}
			}functiona(){
				vart=e.data(ve);if(t){
					for(varn=1;n<t.length;n++)t[n]();e.removeData(ve)
				}
			}functioni(e){
				e.stopPropagation();vart=e.originalEvent||e,
				n=t.$manualTimeStamp||t.timeStamp||Date.now(),
				r=parseFloat(t.elapsedTime.toFixed($e));Math.max(n-o,
				0)>=ee&&r>=te&&(B=!0,
				d())
			}if(!H){
				if(!V.parentNode)returnvoidd();varo,
				l=[],
				c=function(e){
					if(B)K&&e&&(K=!1,
					d());elseif(K=!e,
					Oe.animationDuration){
						vart=x(V,
						K);K?re.push(t): s(re,
						t)
					}
				},
				f=Pe>0&&(Oe.transitionDuration&&0===ke.transitionDuration||Oe.animationDuration&&0===ke.animationDuration)&&Math.max(ke.animationDelay,
				ke.transitionDelay);f?u(t,
				Math.floor(f*Pe*me),
				!1): t(),
				Y.resume=function(){
					c(!0)
				},
				Y.pause=function(){
					c(!1)
				}
			}
		}varq={
			
		},
		V=y(e);if(!V||!V.parentNode||!m.enabled())returnT();n=p(n);varH,
		K,
		B,
		W,
		Y,
		G,
		ee,
		te,
		ne,
		re=[],
		ie=e.attr("class"),
		se=i(n);if(0===n.duration||!c.animations&&!c.transitions)returnT();varue=n.event&&U(n.event)?n.event.join(" "): n.event,
		ce=ue&&n.structural,
		fe="",
		de="";ce?fe=o(ue,
		Z,
		!0): ue&&(fe=ue),
		n.addClass&&(de+=o(n.addClass,
		X)),
		n.removeClass&&(de.length&&(de+=" "),
		de+=o(n.removeClass,
		J)),
		n.applyClassesEarly&&de.length&&O(e,
		n);varpe=[fe,
		de].join(" ").trim(),
		he=ie+" "+pe,
		ge=o(pe,
		Q),
		be=se.to&&Object.keys(se.to).length>0,
		we=(n.keyframeStyle||"").length>0;if(!we&&!be&&!pe)returnT();varxe,
		ke;if(n.stagger>0){
			varSe=parseFloat(n.stagger);ke={
				transitionDelay: Se,
				animationDelay: Se,
				transitionDuration: 0,
				animationDuration: 0
			}
		}elsexe=$(V,
		he),
		ke=C(V,
		pe,
		xe,
		Ce);n.$$skipPreparationClasses||r.addClass(e,
		pe);varAe;if(n.transitionStyle){
			varDe=[L,
			n.transitionStyle];k(V,
			De),
			re.push(De)
		}if(n.duration>=0){
			Ae=V.style[L].length>0;varTe=j(n.duration,
			Ae);k(V,
			Te),
			re.push(Te)
		}if(n.keyframeStyle){
			varEe=[I,
			n.keyframeStyle];k(V,
			Ee),
			re.push(Ee)
		}varPe=ke?n.staggerIndex>=0?n.staggerIndex: t.count(xe): 0,
		je=0===Pe;je&&!n.skipBlocking&&w(V,
		le);varOe=E(V,
		he,
		xe),
		Ne=Oe.maxDelay;G=Math.max(Ne,
		0),
		te=Oe.maxDuration;varLe={
			
		};if(Le.hasTransitions=Oe.transitionDuration>0,
		Le.hasAnimations=Oe.animationDuration>0,
		Le.hasTransitionAll=Le.hasTransitions&&"all"==Oe.transitionProperty,
		Le.applyTransitionDuration=be&&(Le.hasTransitions&&!Le.hasTransitionAll||Le.hasAnimations&&!Le.hasTransitions),
		Le.applyAnimationDuration=n.duration&&Le.hasAnimations,
		Le.applyTransitionDelay=P(n.delay)&&(Le.applyTransitionDuration||Le.hasTransitions),
		Le.applyAnimationDelay=P(n.delay)&&Le.hasAnimations,
		Le.recalculateTimingStyles=de.length>0,
		(Le.applyTransitionDuration||Le.applyAnimationDuration)&&(te=n.duration?parseFloat(n.duration): te,
		Le.applyTransitionDuration&&(Le.hasTransitions=!0,
		Oe.transitionDuration=te,
		Ae=V.style[L+ae].length>0,
		re.push(j(te,
		Ae))),
		Le.applyAnimationDuration&&(Le.hasAnimations=!0,
		Oe.animationDuration=te,
		re.push(A(te)))),
		0===te&&!Le.recalculateTimingStyles)returnT();if(null!=n.delay){
			varFe=parseFloat(n.delay);Le.applyTransitionDelay&&re.push(D(Fe)),
			Le.applyAnimationDelay&&re.push(D(Fe,
			!0))
		}returnnull==n.duration&&Oe.transitionDuration>0&&(Le.recalculateTimingStyles=Le.recalculateTimingStyles||je),
		ee=G*me,
		ne=te*me,
		n.skipBlocking||(Le.blockTransition=Oe.transitionDuration>0,
		Le.blockKeyframeAnimation=Oe.animationDuration>0&&ke.animationDelay>0&&0===ke.animationDuration),
		n.from&&(n.cleanupStyles&&N(q,
		V,
		Object.keys(n.from)),
		g(e,
		n)),
		Le.blockTransition||Le.blockKeyframeAnimation?b(te): n.skipBlocking||w(V,
		!1),
		{
			$$willAnimate: !0,
			end: l,
			start: function(){
				returnH?void0: (Y={
					end: l,
					cancel: f,
					resume: null,
					pause: null
				},
				W=newa(Y),
				S(z),
				W)
			}
		}
	}
}]
}],
xe=["$$animationProvider",
function(e){
functiont(e){
	returne.parentNode&&11===e.parentNode.nodeType
}e.drivers.push("$$animateCssDriver");varn="ng-animate-shim",
r="ng-anchor",
a="ng-anchor-out",
i="ng-anchor-in";this.$get=["$animateCss",
"$rootScope",
"$$AnimateRunner",
"$rootElement",
"$sniffer",
"$$jqLite",
"$document",
function(e,
o,
s,
u,
l,
c,
f){
	functionp(e){
		returne.replace(/\bng-\S+\b/g,
		"")
	}functionh(e,
	t){
		returnV(e)&&(e=e.split(" ")),
		V(t)&&(t=t.split(" ")),
		e.filter(function(e){
			return-1===t.indexOf(e)
		}).join(" ")
	}functiong(t,
	o,
	u){
		functionl(e){
			vart={
				
			},
			n=y(e).getBoundingClientRect();return_(["width",
			"height",
			"top",
			"left"],
			function(e){
				varr=n[e];switch(e){
					case"top": r+=$.scrollTop;break;case"left": r+=$.scrollLeft
				}t[e]=Math.floor(r)+"px"
			}),
			t
		}functionc(){
			vart=e(v,
			{
				addClass: a,
				delay: !0,
				from: l(o)
			});returnt.$$willAnimate?t: null
		}functionf(e){
			returne.attr("class")||""
		}functiond(){
			vart=p(f(u)),
			n=h(t,
			m),
			r=h(m,
			t),
			o=e(v,
			{
				to: l(u),
				addClass: i+" "+n,
				removeClass: a+" "+r,
				delay: !0
			});returno.$$willAnimate?o: null
		}functiong(){
			v.remove(),
			o.removeClass(n),
			u.removeClass(n)
		}varv=q(y(o).cloneNode(!0)),
		m=p(f(v));o.addClass(n),
		u.addClass(n),
		v.addClass(r),
		C.append(v);varb,
		w=c();if(!w&&(b=d(),
		!b))returng();varx=w||b;return{
			start: function(){
				functione(){
					n&&n.end()
				}vart,
				n=x.start();returnn.done(function(){
					returnn=null,
					!b&&(b=d())?(n=b.start(),
					n.done(function(){
						n=null,
						g(),
						t.complete()
					}),
					n): (g(),
					voidt.complete())
				}),
				t=news({
					end: e,
					cancel: e
				})
			}
		}
	}functionv(e,
	t,
	n,
	r){
		vara=m(e,
		M),
		i=m(t,
		M),
		o=[];return_(r,
		function(e){
			vart=e.out,
			r=e["in"],
			a=g(n,
			t,
			r);a&&o.push(a)
		}),
		a||i||0!==o.length?{
			start: function(){
				functione(){
					_(t,
					function(e){
						e.end()
					})
				}vart=[];a&&t.push(a.start()),
				i&&t.push(i.start()),
				_(o,
				function(e){
					t.push(e.start())
				});varn=news({
					end: e,
					cancel: e
				});returns.all(t,
				function(e){
					n.complete(e)
				}),
				n
			}
		}: void0
	}functionm(t){
		varn=t.element,
		r=t.options||{
			
		};t.structural&&(r.event=t.event,
		r.structural=!0,
		r.applyClassesEarly=!0,
		"leave"===t.event&&(r.onDone=r.domOperation)),
		r.preparationClasses&&(r.event=S(r.event,
		r.preparationClasses));vara=e(n,
		r);returna.$$willAnimate?a: null
	}if(!l.animations&&!l.transitions)returnM;var$=f[0].body,
	b=y(u),
	C=q(t(b)||$.contains(b)?b: $);d(c);returnfunction(e){
		returne.from&&e.to?v(e.from,
		e.to,
		e.classes,
		e.anchors): m(e)
	}
}]
}],
ke=["$animateProvider",
function(e){
this.$get=["$injector",
"$$AnimateRunner",
"$$jqLite",
function(t,
n,
r){
	functiona(n){
		n=U(n)?n: n.split(" ");for(varr=[],
		a={
			
		},
		i=0;i<n.length;i++){
			varo=n[i],
			s=e.$$registeredAnimations[o];s&&!a[o]&&(r.push(t.get(s)),
			a[o]=!0)
		}returnr
	}vari=d(r);returnfunction(e,
	t,
	r,
	o){
		functions(){
			o.domOperation(),
			i(e,
			o)
		}functionu(e,
		t,
		r,
		a,
		i){
			varo;switch(r){
				case"animate": o=[t,
				a.from,
				a.to,
				i];break;case"setClass": o=[t,
				g,
				v,
				i];break;case"addClass": o=[t,
				g,
				i];break;case"removeClass": o=[t,
				v,
				i];break;default: o=[t,
				i]
			}o.push(a);vars=e.apply(e,
			o);if(s)if(W(s.start)&&(s=s.start()),
			sinstanceofn)s.done(i);elseif(W(s))returns;returnM
		}functionl(e,
		t,
		r,
		a,
		i){
			varo=[];return_(a,
			function(a){
				vars=a[i];s&&o.push(function(){
					vara,
					i,
					o=!1,
					l=function(e){
						o||(o=!0,
						(i||M)(e),
						a.complete(!e))
					};returna=newn({
						end: function(){
							l()
						},
						cancel: function(){
							l(!0)
						}
					}),
					i=u(s,
					e,
					t,
					r,
					function(e){
						vart=e===!1;l(t)
					}),
					a
				})
			}),
			o
		}functionc(e,
		t,
		r,
		a,
		i){
			varo=l(e,
			t,
			r,
			a,
			i);if(0===o.length){
				vars,
				u;"beforeSetClass"===i?(s=l(e,
				"removeClass",
				r,
				a,
				"beforeRemoveClass"),
				u=l(e,
				"addClass",
				r,
				a,
				"beforeAddClass")): "setClass"===i&&(s=l(e,
				"removeClass",
				r,
				a,
				"removeClass"),
				u=l(e,
				"addClass",
				r,
				a,
				"addClass")),
				s&&(o=o.concat(s)),
				u&&(o=o.concat(u))
			}if(0!==o.length)returnfunction(e){
				vart=[];returno.length&&_(o,
				function(e){
					t.push(e())
				}),
				t.length?n.all(t,
				e): e(),
				function(e){
					_(t,
					function(t){
						e?t.cancel(): t.end()
					})
				}
			}
		}3===arguments.length&&H(r)&&(o=r,
		r=null),
		o=p(o),
		r||(r=e.attr("class")||"",
		o.addClass&&(r+=" "+o.addClass),
		o.removeClass&&(r+=" "+o.removeClass));varf,
		d,
		g=o.addClass,
		v=o.removeClass,
		m=a(r);if(m.length){
			var$,
			y;"leave"==t?(y="leave",
			$="afterLeave"): (y="before"+t.charAt(0).toUpperCase()+t.substr(1),
			$=t),
			"enter"!==t&&"move"!==t&&(f=c(e,
			t,
			o,
			m,
			y)),
			d=c(e,
			t,
			o,
			m,
			$)
		}returnf||d?{
			start: function(){
				functiont(t){
					u=!0,
					s(),
					h(e,
					o),
					l.complete(t)
				}functionr(e){
					u||((a||M)(e),
					t(e))
				}vara,
				i=[];f&&i.push(function(e){
					a=f(e)
				}),
				i.length?i.push(function(e){
					s(),
					e(!0)
				}): s(),
				d&&i.push(function(e){
					a=d(e)
				});varu=!1,
				l=newn({
					end: function(){
						r()
					},
					cancel: function(){
						r(!0)
					}
				});returnn.chain(i,
				t),
				l
			}
		}: void0
	}
}]
}],
Se=["$$animationProvider",
function(e){
e.drivers.push("$$animateJsDriver"),
this.$get=["$$animateJs",
"$$AnimateRunner",
function(e,
t){
	functionn(t){
		varn=t.element,
		r=t.event,
		a=t.options,
		i=t.classes;returne(n,
		r,
		i,
		a)
	}returnfunction(e){
		if(e.from&&e.to){
			varr=n(e.from),
			a=n(e.to);if(!r&&!a)return;return{
				start: function(){
					functione(){
						returnfunction(){
							_(i,
							function(e){
								e.end()
							})
						}
					}functionn(e){
						o.complete(e)
					}vari=[];r&&i.push(r.start()),
					a&&i.push(a.start()),
					t.all(i,
					n);varo=newt({
						end: e(),
						cancel: e()
					});returno
				}
			}
		}returnn(e)
	}
}]
}],
Ae="data-ng-animate",
De="$ngAnimatePin",
Te=["$animateProvider",
function(e){
functiont(e,
t,
n,
r){
	returno[e].some(function(e){
		returne(t,
		n,
		r)
	})
}functionn(e,
t){
	e=e||{
		
	};varn=(e.addClass||"").length>0,
	r=(e.removeClass||"").length>0;returnt?n&&r: n||r
}vara=1,
i=2,
o=this.rules={
	skip: [],
	cancel: [],
	join: []
};o.join.push(function(e,
t,
r){
	return!t.structural&&n(t.options)
}),
o.skip.push(function(e,
t,
r){
	return!t.structural&&!n(t.options)
}),
o.skip.push(function(e,
t,
n){
	return"leave"==n.event&&t.structural
}),
o.skip.push(function(e,
t,
n){
	returnn.structural&&n.state===i&&!t.structural
}),
o.cancel.push(function(e,
t,
n){
	returnn.structural&&t.structural
}),
o.cancel.push(function(e,
t,
n){
	returnn.state===i&&t.structural
}),
o.cancel.push(function(e,
t,
n){
	varr=t.options,
	a=n.options;returnr.addClass&&r.addClass===a.removeClass||r.removeClass&&r.removeClass===a.addClass
}),
this.$get=["$$rAF",
"$rootScope",
"$rootElement",
"$document",
"$$HashMap",
"$$animation",
"$$AnimateRunner",
"$templateRequest",
"$$jqLite",
"$$forceReflow",
function(o,
s,
c,
f,
g,
v,
$,
w,
x,
k){
	functionS(){
		vare=!1;returnfunction(t){
			e?t(): s.$$postDigest(function(){
				e=!0,
				t()
			})
		}
	}functionA(e,
	t){
		returnm(e,
		t,
		{
			
		})
	}functionD(e,
	t){
		varn=y(e),
		r=[],
		a=M[t];returna&&_(a,
		function(e){
			e.node.contains(n)&&r.push(e.callback)
		}),
		r
	}functionT(e,
	r,
	l){
		functionc(t,
		n,
		r,
		a){
			x(function(){
				vart=D(e,
				n);t.length&&o(function(){
					_(t,
					function(t){
						t(e,
						r,
						a)
					})
				})
			}),
			t.progress(n,
			r,
			a)
		}functionf(t){
			C(e,
			l),
			J(e,
			l),
			h(e,
			l),
			l.domOperation(),
			w.complete(!t)
		}vard,
		g;e=u(e),
		e&&(d=y(e),
		g=e.parent()),
		l=p(l);varw=new$,
		x=S();if(U(l.addClass)&&(l.addClass=l.addClass.join(" ")),
		l.addClass&&!V(l.addClass)&&(l.addClass=null),
		U(l.removeClass)&&(l.removeClass=l.removeClass.join(" ")),
		l.removeClass&&!V(l.removeClass)&&(l.removeClass=null),
		l.from&&!H(l.from)&&(l.from=null),
		l.to&&!H(l.to)&&(l.to=null),
		!d)returnf(),
		w;vark=[d.className,
		l.addClass,
		l.removeClass].join(" ");if(!X(k))returnf(),
		w;varT=["enter",
		"move",
		"leave"].indexOf(r)>=0,
		j=!I||F.get(d),
		R=!j&&L.get(d)||{
			
		},
		M=!!R.state;if(j||M&&R.state==a||(j=!O(e,
		g,
		r)),
		j)returnf(),
		w;T&&E(e);varz={
			structural: T,
			element: e,
			event: r,
			close: f,
			options: l,
			runner: w
		};if(M){
			varq=t("skip",
			e,
			z,
			R);if(q)returnR.state===i?(f(),
			w): (m(e,
			R.options,
			l),
			R.runner);varK=t("cancel",
			e,
			z,
			R);if(K)if(R.state===i)R.runner.end();else{
				if(!R.structural)returnm(e,
				R.options,
				z.options),
				R.runner;R.close()
			}else{
				varB=t("join",
				e,
				z,
				R);if(B){
					if(R.state!==i)returnb(e,
					T?r: null,
					l),
					r=z.event=R.event,
					l=m(e,
					R.options,
					z.options),
					R.runner;A(e,
					l)
				}
			}
		}elseA(e,
		l);varW=z.structural;if(W||(W="animate"===z.event&&Object.keys(z.options.to||{
			
		}).length>0||n(z.options)),
		!W)returnf(),
		P(e),
		w;varY=(R.counter||0)+1;returnz.counter=Y,
		N(e,
		a,
		z),
		s.$$postDigest(function(){
			vart=L.get(d),
			a=!t;t=t||{
				
			};varo=e.parent()||[],
			s=o.length>0&&("animate"===t.event||t.structural||n(t.options));if(a||t.counter!==Y||!s)returna&&(J(e,
			l),
			h(e,
			l)),
			(a||T&&t.event!==r)&&(l.domOperation(),
			w.end()),
			void(s||P(e));r=!t.structural&&n(t.options,
			!0)?"setClass": t.event,
			N(e,
			i);varu=v(e,
			r,
			t.options);u.done(function(t){
				f(!t);varn=L.get(d);n&&n.counter===Y&&P(y(e)),
				c(w,
				r,
				"close",
				{
					
				})
			}),
			w.setHost(u),
			c(w,
			r,
			"start",
			{
				
			})
		}),
		w
	}functionE(e){
		vart=y(e),
		n=t.querySelectorAll("["+Ae+"]");_(n,
		function(e){
			vart=parseInt(e.getAttribute(Ae)),
			n=L.get(e);switch(t){
				casei: n.runner.end();casea: n&&L.remove(e)
			}
		})
	}functionP(e){
		vart=y(e);t.removeAttribute(Ae),
		L.remove(t)
	}functionj(e,
	t){
		returny(e)===y(t)
	}functionO(e,
	t,
	n){
		varr,
		a=q(f[0].body),
		i=j(e,
		a)||"HTML"===e[0].nodeName,
		o=j(e,
		c),
		s=!1,
		u=e.data(De);for(u&&(t=u);t&&t.length;){
			o||(o=j(t,
			c));varl=t[0];if(l.nodeType!==G)break;vard=L.get(l)||{
				
			};if(s||(s=d.structural||F.get(l)),
			K(r)||r===!0){
				varp=t.data(te);B(p)&&(r=p)
			}if(s&&r===!1)break;o||(o=j(t,
			c),
			o||(u=t.data(De),
			u&&(t=u))),
			i||(i=j(t,
			a)),
			t=t.parent()
		}varh=!s||r;returnh&&o&&i
	}functionN(e,
	t,
	n){
		n=n||{
			
		},
		n.state=t;varr=y(e);r.setAttribute(Ae,
		t);vara=L.get(r),
		i=a?z(a,
		n): n;L.put(r,
		i)
	}varL=newg,
	F=newg,
	I=null,
	R=s.$watch(function(){
		return0===w.totalPendingRequests
	},
	function(e){
		e&&(R(),
		s.$$postDigest(function(){
			s.$$postDigest(function(){
				null===I&&(I=!0)
			})
		}))
	}),
	M={
		
	},
	W=e.classNameFilter(),
	X=W?function(e){
		returnW.test(e)
	}: function(){
		return!0
	},
	J=d(x);return{
		on: function(e,
		t,
		n){
			varr=l(t);M[e]=M[e]||[],
			M[e].push({
				node: r,
				callback: n
			})
		},
		off: function(e,
		t,
		n){
			functionr(e,
			t,
			n){
				varr=l(t);returne.filter(function(e){
					vart=e.node===r&&(!n||e.callback===n);return!t
				})
			}vara=M[e];a&&(M[e]=1===arguments.length?null: r(a,
			t,
			n))
		},
		pin: function(e,
		t){
			r(Y(e),
			"element",
			"not an element"),
			r(Y(t),
			"parentElement",
			"not an element"),
			e.data(De,
			t)
		},
		push: function(e,
		t,
		n,
		r){
			returnn=n||{
				
			},
			n.domOperation=r,
			T(e,
			t,
			n)
		},
		enabled: function(e,
		t){
			varn=arguments.length;if(0===n)t=!!I;else{
				varr=Y(e);if(r){
					vara=y(e),
					i=F.get(a);1===n?t=!i: (t=!!t,
					t?i&&F.remove(a): F.put(a,
					!0))
				}elset=I=!!e
			}returnt
		}
	}
}]
}],
Ee=["$$rAF",
function(e){
functiont(t){
	n.push(t),
	n.length>1||e(function(){
		for(vare=0;e<n.length;e++)n[e]();n=[]
	})
}varn=[];returnfunction(){
	vare=!1;returnt(function(){
		e=!0
	}),
	function(n){
		e?n(): t(n)
	}
}
}],
Pe=["$q",
"$sniffer",
"$$animateAsyncRun",
function(e,
t,
n){
functionr(e){
	this.setHost(e),
	this._doneCallbacks=[],
	this._runInAnimationFrame=n(),
	this._state=0
}vara=0,
i=1,
o=2;returnr.chain=function(e,
t){
	functionn(){
		returnr===e.length?voidt(!0): voide[r](function(e){
			returne===!1?voidt(!1): (r++,
			voidn())
		})
	}varr=0;n()
},
r.all=function(e,
t){
	functionn(n){
		a=a&&n,
		++r===e.length&&t(a)
	}varr=0,
	a=!0;_(e,
	function(e){
		e.done(n)
	})
},
r.prototype={
	setHost: function(e){
		this.host=e||{
			
		}
	},
	done: function(e){
		this._state===o?e(): this._doneCallbacks.push(e)
	},
	progress: M,
	getPromise: function(){
		if(!this.promise){
			vart=this;this.promise=e(function(e,
			n){
				t.done(function(t){
					t===!1?n(): e()
				})
			})
		}returnthis.promise
	},
	then: function(e,
	t){
		returnthis.getPromise().then(e,
		t)
	},
	"catch": function(e){
		returnthis.getPromise()["catch"](e)
	},
	"finally": function(e){
		returnthis.getPromise()["finally"](e)
	},
	pause: function(){
		this.host.pause&&this.host.pause()
	},
	resume: function(){
		this.host.resume&&this.host.resume()
	},
	end: function(){
		this.host.end&&this.host.end(),
		this._resolve(!0)
	},
	cancel: function(){
		this.host.cancel&&this.host.cancel(),
		this._resolve(!1)
	},
	complete: function(e){
		vart=this;t._state===a&&(t._state=i,
		t._runInAnimationFrame(function(){
			t._resolve(e)
		}))
	},
	_resolve: function(e){
		this._state!==o&&(_(this._doneCallbacks,
		function(t){
			t(e)
		}),
		this._doneCallbacks.length=0,
		this._state=o)
	}
},
r
}],
je=["$animateProvider",
function(e){
functiont(e,
t){
	e.data(s,
	t)
}functionn(e){
	e.removeData(s)
}functionr(e){
	returne.data(s)
}vari="ng-animate-ref",
o=this.drivers=[],
s="$$animationRunner";this.$get=["$$jqLite",
"$rootScope",
"$injector",
"$$AnimateRunner",
"$$HashMap",
"$$rAFScheduler",
function(e,
s,
u,
l,
c,
f){
	functiong(e){
		functiont(e){
			if(e.processed)returne;e.processed=!0;varn=e.domNode,
			r=n.parentNode;i.put(n,
			e);for(varo;r;){
				if(o=i.get(r)){
					o.processed||(o=t(o));break
				}r=r.parentNode
			}return(o||a).children.push(e),
			e
		}functionn(e){
			vart,
			n=[],
			r=[];for(t=0;t<e.children.length;t++)r.push(e.children[t]);vara=r.length,
			i=0,
			o=[];for(t=0;t<r.length;t++){
				vars=r[t];0>=a&&(a=i,
				i=0,
				n.push(o),
				o=[]),
				o.push(s.fn),
				s.children.forEach(function(e){
					i++,
					r.push(e)
				}),
				a--
			}returno.length&&n.push(o),
			n
		}varr,
		a={
			children: []
		},
		i=newc;for(r=0;r<e.length;r++){
			varo=e[r];i.put(o.domNode,
			e[r]={
				domNode: o.domNode,
				fn: o.fn,
				children: []
			})
		}for(r=0;r<e.length;r++)t(e[r]);returnn(a)
	}varv=[],
	m=d(e);returnfunction(c,
	d,
	$){
		functionb(e){
			vart="["+i+"]",
			n=e.hasAttribute(i)?[e]: e.querySelectorAll(t),
			r=[];return_(n,
			function(e){
				vart=e.getAttribute(i);t&&t.length&&r.push(e)
			}),
			r
		}functionC(e){
			vart=[],
			n={
				
			};_(e,
			function(e,
			r){
				vara=e.element,
				o=y(a),
				s=e.event,
				u=["enter",
				"move"].indexOf(s)>=0,
				l=e.structural?b(o): [];if(l.length){
					varc=u?"to": "from";_(l,
					function(e){
						vart=e.getAttribute(i);n[t]=n[t]||{
							
						},
						n[t][c]={
							animationID: r,
							element: q(e)
						}
					})
				}elset.push(e)
			});varr={
				
			},
			a={
				
			};return_(n,
			function(n,
			i){
				varo=n.from,
				s=n.to;if(!o||!s){
					varu=o?o.animationID: s.animationID,
					l=u.toString();returnvoid(r[l]||(r[l]=!0,
					t.push(e[u])))
				}varc=e[o.animationID],
				f=e[s.animationID],
				d=o.animationID.toString();if(!a[d]){
					varp=a[d]={
						structural: !0,
						beforeStart: function(){
							c.beforeStart(),
							f.beforeStart()
						},
						close: function(){
							c.close(),
							f.close()
						},
						classes: w(c.classes,
						f.classes),
						from: c,
						to: f,
						anchors: []
					};p.classes.length?t.push(p): (t.push(c),
					t.push(f))
				}a[d].anchors.push({
					out: o.element,
					"in": s.element
				})
			}),
			t
		}functionw(e,
		t){
			e=e.split(" "),
			t=t.split(" ");for(varn=[],
			r=0;r<e.length;r++){
				vara=e[r];if("ng-"!==a.substring(0,
				3))for(vari=0;i<t.length;i++)if(a===t[i]){
					n.push(a);break
				}
			}returnn.join(" ")
		}functionx(e){
			for(vart=o.length-1;t>=0;t--){
				varn=o[t];if(u.has(n)){
					varr=u.get(n),
					a=r(e);if(a)returna
				}
			}
		}functionk(){
			c.addClass(ee),
			j&&e.addClass(c,
			j)
		}functionS(e,
		t){
			functionn(e){
				r(e).setHost(t)
			}e.from&&e.to?(n(e.from.element),
			n(e.to.element)): n(e.element)
		}functionA(){
			vare=r(c);!e||"leave"===d&&$.$$domOperationFired||e.end()
		}functionD(t){
			c.off("$destroy",
			A),
			n(c),
			m(c,
			$),
			h(c,
			$),
			$.domOperation(),
			j&&e.removeClass(c,
			j),
			c.removeClass(ee),
			E.complete(!t)
		}$=p($);varT=["enter",
		"move",
		"leave"].indexOf(d)>=0,
		E=newl({
			end: function(){
				D()
			},
			cancel: function(){
				D(!0)
			}
		});if(!o.length)returnD(),
		E;t(c,
		E);varP=a(c.attr("class"),
		a($.addClass,
		$.removeClass)),
		j=$.tempClasses;returnj&&(P+=" "+j,
		$.tempClasses=null),
		v.push({
			element: c,
			classes: P,
			event: d,
			structural: T,
			options: $,
			beforeStart: k,
			close: D
		}),
		c.on("$destroy",
		A),
		v.length>1?E: (s.$$postDigest(function(){
			vare=[];_(v,
			function(t){
				r(t.element)?e.push(t): t.close()
			}),
			v.length=0;vart=C(e),
			n=[];_(t,
			function(e){
				n.push({
					domNode: y(e.from?e.from.element: e.element),
					fn: function(){
						e.beforeStart();vart,
						n=e.close,
						a=e.anchors?e.from.element||e.to.element: e.element;if(r(a)){
							vari=x(e);i&&(t=i.start)
						}if(t){
							varo=t();o.done(function(e){
								n(!e)
							}),
							S(e,
							o)
						}elsen()
					}
				})
			}),
			f(g(n))
		}),
		E)
	}
}]
}];t.module("ngAnimate",
[]).directive("ngAnimateChildren",
ge).factory("$$rAFScheduler",
he).factory("$$AnimateRunner",
Pe).factory("$$animateAsyncRun",
Ee).provider("$$animateQueue",
Te).provider("$$animation",
je).provider("$animateCss",
we).provider("$$animateCssDriver",
xe).provider("$$animateJs",
ke).provider("$$animateJsDriver",
Se)
}(window,
window.angular),
function(e,
t){
"function"==typeofdefine&&define.amd?define([],
function(){
returnt()
}): "object"==typeofexports?module.exports=t(): t()
}(this,
function(){
functione(e){
"use strict";vart=e.storageKey(),
n=e.storage(),
r=function(){
	varr=e.preferredLanguage();angular.isString(r)?e.use(r): n.put(t,
	e.use())
};r.displayName="fallbackFromIncorrectStorageValue",
n?n.get(t)?e.use(n.get(t))["catch"](r): r(): angular.isString(e.preferredLanguage())&&e.use(e.preferredLanguage())
}functiont(){
"use strict";vare,
t,
n=null,
r=!1,
a=!1;t={
	sanitize: function(e,
	t){
		return"text"===t&&(e=o(e)),
		e
	},
	escape: function(e,
	t){
		return"text"===t&&(e=i(e)),
		e
	},
	sanitizeParameters: function(e,
	t){
		return"params"===t&&(e=s(e,
		o)),
		e
	},
	escapeParameters: function(e,
	t){
		return"params"===t&&(e=s(e,
		i)),
		e
	}
},
t.escaped=t.escapeParameters,
this.addStrategy=function(e,
n){
	returnt[e]=n,
	this
},
this.removeStrategy=function(e){
	returndeletet[e],
	this
},
this.useStrategy=function(e){
	returnr=!0,
	n=e,
	this
},
this.$get=["$injector",
"$log",
function(i,
o){
	vars={
		
	},
	u=function(e,
	n,
	r){
		returnangular.forEach(r,
		function(r){
			if(angular.isFunction(r))e=r(e,
			n);elseif(angular.isFunction(t[r]))e=t[r](e,
			n);else{
				if(!angular.isString(t[r]))thrownewError("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+r+"'");if(!s[t[r]])try{
					s[t[r]]=i.get(t[r])
				}catch(a){
					throws[t[r]]=function(){
						
					},
					newError("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '"+r+"'")
				}e=s[t[r]](e,
				n)
			}
		}),
		e
	},
	l=function(){
		r||a||(o.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."),
		a=!0)
	};returni.has("$sanitize")&&(e=i.get("$sanitize")),
	{
		useStrategy: function(e){
			returnfunction(t){
				e.useStrategy(t)
			}
		}(this),
		sanitize: function(e,
		t,
		r){
			if(n||l(),
			arguments.length<3&&(r=n),
			!r)returne;vara=angular.isArray(r)?r: [r];returnu(e,
			t,
			a)
		}
	}
}];vari=function(e){
	vart=angular.element("<div></div>");returnt.text(e),
	t.html()
},
o=function(t){
	if(!e)thrownewError("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");returne(t)
},
s=function(e,
t){
	if(angular.isObject(e)){
		varn=angular.isArray(e)?[]: {
			
		};returnangular.forEach(e,
		function(e,
		r){
			n[r]=s(e,
			t)
		}),
		n
	}returnangular.isNumber(e)?e: t(e)
}
}functionn(e,
t,
n,
r){
"use strict";vara,
i,
o,
s,
u,
l,
c,
f,
d,
p,
h,
g,
v,
m,
$,
y={
	
},
b=[],
C=e,
w=[],
x="translate-cloak",
k=!1,
S=!1,
A=".",
D=!1,
T=0,
E=!0,
P="default",
j={
	"default": function(e){
		return(e||"").split("-").join("_")
	},
	java: function(e){
		vart=(e||"").split("-").join("_"),
		n=t.split("_");returnn.length>1?n[0].toLowerCase()+"_"+n[1].toUpperCase(): t
	},
	bcp47: function(e){
		vart=(e||"").split("_").join("-"),
		n=t.split("-");returnn.length>1?n[0].toLowerCase()+"-"+n[1].toUpperCase(): t
	}
},
O="2.8.1",
N=function(){
	if(angular.isFunction(r.getLocale))returnr.getLocale();vare,
	n,
	a=t.$get().navigator,
	i=["language",
	"browserLanguage",
	"systemLanguage",
	"userLanguage"];if(angular.isArray(a.languages))for(e=0;e<a.languages.length;e++)if(n=a.languages[e],
	n&&n.length)returnn;for(e=0;e<i.length;e++)if(n=a[i[e]],
	n&&n.length)returnn;returnnull
};N.displayName="angular-translate/service: getFirstBrowserLanguage";varL=function(){
	vare=N()||"";returnj[P]&&(e=j[P](e)),
	e
};L.displayName="angular-translate/service: getLocale";varF=function(e,
t){
	for(varn=0,
	r=e.length;r>n;n++)if(e[n]===t)returnn;return-1
},
I=function(){
	returnthis.toString().replace(/^\s+|\s+$/g,
	"")
},
R=function(e){
	for(vart=[],
	n=angular.lowercase(e),
	r=0,
	a=b.length;a>r;r++)t.push(angular.lowercase(b[r]));if(F(t,
	n)>-1)returne;if(i){
		varo;for(varsini){
			varu=!1,
			l=Object.prototype.hasOwnProperty.call(i,
			s)&&angular.lowercase(s)===angular.lowercase(e);if("*"===s.slice(-1)&&(u=s.slice(0,
			-1)===e.slice(0,
			s.length-1)),
			(l||u)&&(o=i[s],
			F(t,
			angular.lowercase(o))>-1))returno
		}
	}if(e){
		varc=e.split("_");if(c.length>1&&F(t,
		angular.lowercase(c[0]))>-1)returnc[0]
	}returne
},
M=function(e,
t){
	if(!e&&!t)returny;if(e&&!t){
		if(angular.isString(e))returny[e]
	}elseangular.isObject(y[e])||(y[e]={
		
	}),
	angular.extend(y[e],
	z(t));returnthis
};this.translations=M,
this.cloakClassName=function(e){
	returne?(x=e,
	this): x
},
this.nestedObjectDelimeter=function(e){
	returne?(A=e,
	this): A
};varz=function(e,
t,
n,
r){
	vara,
	i,
	o,
	s;t||(t=[]),
	n||(n={
		
	});for(aine)Object.prototype.hasOwnProperty.call(e,
	a)&&(s=e[a],
	angular.isObject(s)?z(s,
	t.concat(a),
	n,
	a): (i=t.length?""+t.join(A)+A+a: a,
	t.length&&a===r&&(o=""+t.join(A),
	n[o]="@:"+i),
	n[i]=s));returnn
};z.displayName="flatObject",
this.addInterpolation=function(e){
	returnw.push(e),
	this
},
this.useMessageFormatInterpolation=function(){
	returnthis.useInterpolation("$translateMessageFormatInterpolation")
},
this.useInterpolation=function(e){
	returnp=e,
	this
},
this.useSanitizeValueStrategy=function(e){
	returnn.useStrategy(e),
	this
},
this.preferredLanguage=function(e){
	returne?(q(e),
	this): a
};varq=function(e){
	returne&&(a=e),
	a
};this.translationNotFoundIndicator=function(e){
	returnthis.translationNotFoundIndicatorLeft(e),
	this.translationNotFoundIndicatorRight(e),
	this
},
this.translationNotFoundIndicatorLeft=function(e){
	returne?(v=e,
	this): v
},
this.translationNotFoundIndicatorRight=function(e){
	returne?(m=e,
	this): m
},
this.fallbackLanguage=function(e){
	return_(e),
	this
};var_=function(e){
	returne?(angular.isString(e)?(s=!0,
	o=[e]): angular.isArray(e)&&(s=!1,
	o=e),
	angular.isString(a)&&F(o,
	a)<0&&o.push(a),
	this): s?o[0]: o
};this.use=function(e){
	if(e){
		if(!y[e]&&!h)thrownewError("$translateProvider couldn't find translationTable for langKey: '"+e+"'");returnu=e,
		this
	}returnu
};varU=function(e){
	returne?(C=e,
	this): f?f+C: C
};this.storageKey=U,
this.useUrlLoader=function(e,
t){
	returnthis.useLoader("$translateUrlLoader",
	angular.extend({
		url: e
	},
	t))
},
this.useStaticFilesLoader=function(e){
	returnthis.useLoader("$translateStaticFilesLoader",
	e)
},
this.useLoader=function(e,
t){
	returnh=e,
	g=t||{
		
	},
	this
},
this.useLocalStorage=function(){
	returnthis.useStorage("$translateLocalStorage")
},
this.useCookieStorage=function(){
	returnthis.useStorage("$translateCookieStorage")
},
this.useStorage=function(e){
	returnc=e,
	this
},
this.storagePrefix=function(e){
	returne?(f=e,
	this): e
},
this.useMissingTranslationHandlerLog=function(){
	returnthis.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
},
this.useMissingTranslationHandler=function(e){
	returnd=e,
	this
},
this.usePostCompiling=function(e){
	returnk=!!e,
	this
},
this.forceAsyncReload=function(e){
	returnS=!!e,
	this
},
this.uniformLanguageTag=function(e){
	returne?angular.isString(e)&&(e={
		standard: e
	}): e={
		
	},
	P=e.standard,
	this
},
this.determinePreferredLanguage=function(e){
	vart=e&&angular.isFunction(e)?e(): L();returna=b.length?R(t): t,
	this
},
this.registerAvailableLanguageKeys=function(e,
t){
	returne?(b=e,
	t&&(i=t),
	this): b
},
this.useLoaderCache=function(e){
	returne===!1?$=void0: e===!0?$=!0: "undefined"==typeofe?$="$translationCache": e&&($=e),
	this
},
this.directivePriority=function(e){
	returnvoid0===e?T: (T=e,
	this)
},
this.statefulFilter=function(e){
	returnvoid0===e?E: (E=e,
	this)
},
this.$get=["$log",
"$injector",
"$rootScope",
"$q",
function(e,
t,
n,
r){
	vari,
	f,
	b,
	P=t.get(p||"$translateDefaultInterpolation"),
	j=!1,
	N={
		
	},
	L={
		
	},
	V=function(e,
	t,
	n,
	s){
		if(angular.isArray(e)){
			varl=function(e){
				for(vara={
					
				},
				i=[],
				o=function(e){
					vari=r.defer(),
					o=function(t){
						a[e]=t,
						i.resolve([e,
						t])
					};returnV(e,
					t,
					n,
					s).then(o,
					o),
					i.promise
				},
				u=0,
				l=e.length;l>u;u++)i.push(o(e[u]));returnr.all(i).then(function(){
					returna
				})
			};returnl(e)
		}vard=r.defer();e&&(e=I.apply(e));varp=function(){
			vare=a?L[a]: L[u];if(f=0,
			c&&!e){
				vart=i.get(C);if(e=L[t],
				o&&o.length){
					varn=F(o,
					t);f=0===n?1: 0,
					F(o,
					a)<0&&o.push(a)
				}
			}returne
		}();if(p){
			varh=function(){
				ne(e,
				t,
				n,
				s).then(d.resolve,
				d.reject)
			};h.displayName="promiseResolved",
			p["finally"](h,
			d.reject)
		}elsene(e,
		t,
		n,
		s).then(d.resolve,
		d.reject);returnd.promise
	},
	H=function(e){
		returnv&&(e=[v,
		e].join(" ")),
		m&&(e=[e,
		m].join(" ")),
		e
	},
	K=function(e){
		u=e,
		c&&i.put(V.storageKey(),
		u),
		n.$emit("$translateChangeSuccess",
		{
			language: e
		}),
		P.setLocale(u);vart=function(e,
		t){
			N[t].setLocale(u)
		};t.displayName="eachInterpolatorLocaleSetter",
		angular.forEach(N,
		t),
		n.$emit("$translateChangeEnd",
		{
			language: e
		})
	},
	B=function(e){
		if(!e)throw"No language key specified for loading.";vara=r.defer();n.$emit("$translateLoadingStart",
		{
			language: e
		}),
		j=!0;vari=$;"string"==typeofi&&(i=t.get(i));varo=angular.extend({
			
		},
		g,
		{
			key: e,
			$http: angular.extend({
				
			},
			{
				cache: i
			},
			g.$http)
		}),
		s=function(t){
			varr={
				
			};n.$emit("$translateLoadingSuccess",
			{
				language: e
			}),
			angular.isArray(t)?angular.forEach(t,
			function(e){
				angular.extend(r,
				z(e))
			}): angular.extend(r,
			z(t)),
			j=!1,
			a.resolve({
				key: e,
				table: r
			}),
			n.$emit("$translateLoadingEnd",
			{
				language: e
			})
		};s.displayName="onLoaderSuccess";varu=function(e){
			n.$emit("$translateLoadingError",
			{
				language: e
			}),
			a.reject(e),
			n.$emit("$translateLoadingEnd",
			{
				language: e
			})
		};returnu.displayName="onLoaderError",
		t.get(h)(o).then(s,
		u),
		a.promise
	};if(c&&(i=t.get(c),
	!i.get||!i.put))thrownewError("Couldn't use storage '"+c+"', missing get() or put() method!");if(w.length){
		varW=function(e){
			varn=t.get(e);n.setLocale(a||u),
			N[n.getInterpolationIdentifier()]=n
		};W.displayName="interpolationFactoryAdder",
		angular.forEach(w,
		W)
	}varY=function(e){
		vart=r.defer();if(Object.prototype.hasOwnProperty.call(y,
		e))t.resolve(y[e]);elseif(L[e]){
			varn=function(e){
				M(e.key,
				e.table),
				t.resolve(e.table)
			};n.displayName="translationTableResolver",
			L[e].then(n,
			t.reject)
		}elset.reject();returnt.promise
	},
	G=function(e,
	t,
	n,
	a){
		vari=r.defer(),
		o=function(r){
			if(Object.prototype.hasOwnProperty.call(r,
			t)){
				a.setLocale(e);varo=r[t];"@:"===o.substr(0,
				2)?G(e,
				o.substr(2),
				n,
				a).then(i.resolve,
				i.reject): i.resolve(a.interpolate(r[t],
				n)),
				a.setLocale(u)
			}elsei.reject()
		};returno.displayName="fallbackTranslationResolver",
		Y(e).then(o,
		i.reject),
		i.promise
	},
	X=function(e,
	t,
	n,
	r){
		vara,
		i=y[e];if(i&&Object.prototype.hasOwnProperty.call(i,
		t)){
			if(r.setLocale(e),
			a=r.interpolate(i[t],
			n),
			"@:"===a.substr(0,
			2))returnX(e,
			a.substr(2),
			n,
			r);r.setLocale(u)
		}returna
	},
	J=function(e,
	n){
		if(d){
			varr=t.get(d)(e,
			u,
			n);returnvoid0!==r?r: e
		}returne
	},
	Z=function(e,
	t,
	n,
	a,
	i){
		vars=r.defer();if(e<o.length){
			varu=o[e];G(u,
			t,
			n,
			a).then(s.resolve,
			function(){
				Z(e+1,
				t,
				n,
				a,
				i).then(s.resolve)
			})
		}elsei?s.resolve(i): s.resolve(J(t,
		n));returns.promise
	},
	Q=function(e,
	t,
	n,
	r){
		vara;if(e<o.length){
			vari=o[e];a=X(i,
			t,
			n,
			r),
			a||(a=Q(e+1,
			t,
			n,
			r))
		}returna
	},
	ee=function(e,
	t,
	n,
	r){
		returnZ(b>0?b: f,
		e,
		t,
		n,
		r)
	},
	te=function(e,
	t,
	n){
		returnQ(b>0?b: f,
		e,
		t,
		n)
	},
	ne=function(e,
	t,
	n,
	a){
		vari=r.defer(),
		s=u?y[u]: y,
		l=n?N[n]: P;if(s&&Object.prototype.hasOwnProperty.call(s,
		e)){
			varc=s[e];"@:"===c.substr(0,
			2)?V(c.substr(2),
			t,
			n,
			a).then(i.resolve,
			i.reject): i.resolve(l.interpolate(c,
			t))
		}else{
			varf;d&&!j&&(f=J(e,
			t)),
			u&&o&&o.length?ee(e,
			t,
			l,
			a).then(function(e){
				i.resolve(e)
			},
			function(e){
				i.reject(H(e))
			}): d&&!j&&f?a?i.resolve(a): i.resolve(f): a?i.resolve(a): i.reject(H(e))
		}returni.promise
	},
	re=function(e,
	t,
	n){
		varr,
		a=u?y[u]: y,
		i=P;if(N&&Object.prototype.hasOwnProperty.call(N,
		n)&&(i=N[n]),
		a&&Object.prototype.hasOwnProperty.call(a,
		e)){
			vars=a[e];r="@:"===s.substr(0,
			2)?re(s.substr(2),
			t,
			n): i.interpolate(s,
			t)
		}else{
			varl;d&&!j&&(l=J(e,
			t)),
			u&&o&&o.length?(f=0,
			r=te(e,
			t,
			i)): r=d&&!j&&l?l: H(e)
		}returnr
	},
	ae=function(e){
		l===e&&(l=void0),
		L[e]=void0
	};V.preferredLanguage=function(e){
		returne&&q(e),
		a
	},
	V.cloakClassName=function(){
		returnx
	},
	V.nestedObjectDelimeter=function(){
		returnA
	},
	V.fallbackLanguage=function(e){
		if(void0!==e&&null!==e){
			if(_(e),
			h&&o&&o.length)for(vart=0,
			n=o.length;n>t;t++)L[o[t]]||(L[o[t]]=B(o[t]));V.use(V.use())
		}returns?o[0]: o
	},
	V.useFallbackLanguage=function(e){
		if(void0!==e&&null!==e)if(e){
			vart=F(o,
			e);t>-1&&(b=t)
		}elseb=0
	},
	V.proposedLanguage=function(){
		returnl
	},
	V.storage=function(){
		returni
	},
	V.use=function(e){
		if(!e)returnu;vart=r.defer();n.$emit("$translateChangeStart",
		{
			language: e
		});vara=R(e);returna&&(e=a),
		!S&&y[e]||!h||L[e]?l===e&&L[e]?L[e].then(function(e){
			returnt.resolve(e.key),
			e
		},
		function(e){
			returnt.reject(e),
			r.reject(e)
		}): (t.resolve(e),
		K(e)): (l=e,
		L[e]=B(e).then(function(n){
			returnM(n.key,
			n.table),
			t.resolve(n.key),
			l===e&&K(n.key),
			n
		},
		function(e){
			returnn.$emit("$translateChangeError",
			{
				language: e
			}),
			t.reject(e),
			n.$emit("$translateChangeEnd",
			{
				language: e
			}),
			r.reject(e)
		}),
		L[e]["finally"](function(){
			ae(e)
		})),
		t.promise
	},
	V.storageKey=function(){
		returnU()
	},
	V.isPostCompilingEnabled=function(){
		returnk
	},
	V.isForceAsyncReloadEnabled=function(){
		returnS
	},
	V.refresh=function(e){
		functiont(){
			i.resolve(),
			n.$emit("$translateRefreshEnd",
			{
				language: e
			})
		}functiona(){
			i.reject(),
			n.$emit("$translateRefreshEnd",
			{
				language: e
			})
		}if(!h)thrownewError("Couldn't refresh translation table, no loader registered!");vari=r.defer();if(n.$emit("$translateRefreshStart",
		{
			language: e
		}),
		e)if(y[e]){
			vars=function(n){
				M(n.key,
				n.table),
				e===u&&K(u),
				t()
			};s.displayName="refreshPostProcessor",
			B(e).then(s,
			a)
		}elsea();else{
			varl=[],
			c={
				
			};if(o&&o.length)for(varf=0,
			d=o.length;d>f;f++)l.push(B(o[f])),
			c[o[f]]=!0;u&&!c[u]&&l.push(B(u));varp=function(e){
				y={
					
				},
				angular.forEach(e,
				function(e){
					M(e.key,
					e.table)
				}),
				u&&K(u),
				t()
			};p.displayName="refreshPostProcessor",
			r.all(l).then(p,
			a)
		}returni.promise
	},
	V.instant=function(e,
	t,
	n){
		if(null===e||angular.isUndefined(e))returne;if(angular.isArray(e)){
			for(varr={
				
			},
			i=0,
			s=e.length;s>i;i++)r[e[i]]=V.instant(e[i],
			t,
			n);returnr
		}if(angular.isString(e)&&e.length<1)returne;e&&(e=I.apply(e));varl,
		c=[];a&&c.push(a),
		u&&c.push(u),
		o&&o.length&&(c=c.concat(o));for(varf=0,
		p=c.length;p>f;f++){
			varh=c[f];if(y[h]&&("undefined"!=typeofy[h][e]?l=re(e,
			t,
			n): (v||m)&&(l=H(e))),
			"undefined"!=typeofl)break
		}returnl||""===l||(l=P.interpolate(e,
		t),
		d&&!j&&(l=J(e,
		t))),
		l
	},
	V.versionInfo=function(){
		returnO
	},
	V.loaderCache=function(){
		return$
	},
	V.directivePriority=function(){
		returnT
	},
	V.statefulFilter=function(){
		returnE
	},
	V.isReady=function(){
		returnD
	};varie=r.defer();ie.promise.then(function(){
		D=!0
	}),
	V.onReady=function(e){
		vart=r.defer();returnangular.isFunction(e)&&t.promise.then(e),
		D?t.resolve(): ie.promise.then(t.resolve),
		t.promise
	};varoe=n.$on("$translateReady",
	function(){
		ie.resolve(),
		oe(),
		oe=null
	}),
	se=n.$on("$translateChangeEnd",
	function(){
		ie.resolve(),
		se(),
		se=null
	});if(h){
		if(angular.equals(y,
		{
			
		})&&V.use()&&V.use(V.use()),
		o&&o.length)for(varue=function(e){
			returnM(e.key,
			e.table),
			n.$emit("$translateChangeEnd",
			{
				language: e.key
			}),
			e
		},
		le=0,
		ce=o.length;ce>le;le++){
			varfe=o[le];(S||!y[fe])&&(L[fe]=B(fe).then(ue))
		}
	}elsen.$emit("$translateReady",
	{
		language: V.use()
	});returnV
}]
}functionr(e,
t){
"use strict";varn,
r={
	
},
a="default";returnr.setLocale=function(e){
	n=e
},
r.getInterpolationIdentifier=function(){
	returna
},
r.useSanitizeValueStrategy=function(e){
	returnt.useStrategy(e),
	this
},
r.interpolate=function(n,
r){
	r=r||{
		
	},
	r=t.sanitize(r,
	"params");vara=e(n)(r);returna=t.sanitize(a,
	"text")
},
r
}functiona(e,
t,
n,
r,
a,
o){
"use strict";vars=function(){
	returnthis.toString().replace(/^\s+|\s+$/g,
	"")
};return{
	restrict: "AE",
	scope: !0,
	priority: e.directivePriority(),
	compile: function(t,
	u){
		varl=u.translateValues?u.translateValues: void0,
		c=u.translateInterpolation?u.translateInterpolation: void0,
		f=t[0].outerHTML.match(/translate-value-+/i),
		d="^(.*)("+n.startSymbol()+".*"+n.endSymbol()+")(.*)",
		p="^(.*)"+n.startSymbol()+"(.*)"+n.endSymbol()+"(.*)";returnfunction(t,
		h,
		g){
			t.interpolateParams={
				
			},
			t.preText="",
			t.postText="",
			t.translateNamespace=i(t);varv={
				
			},
			m=function(e,
			n,
			r){
				if(n.translateValues&&angular.extend(e,
				a(n.translateValues)(t.$parent)),
				f)for(variinr)if(Object.prototype.hasOwnProperty.call(n,
				i)&&"translateValue"===i.substr(0,
				14)&&"translateValues"!==i){
					varo=angular.lowercase(i.substr(14,
					1))+i.substr(15);e[o]=r[i]
				}
			},
			$=function(e){
				if(angular.isFunction($._unwatchOld)&&($._unwatchOld(),
				$._unwatchOld=void0),
				angular.equals(e,
				"")||!angular.isDefined(e)){
					varr=s.apply(h.text()),
					a=r.match(d);if(angular.isArray(a)){
						t.preText=a[1],
						t.postText=a[3],
						v.translate=n(a[2])(t.$parent);vari=r.match(p);angular.isArray(i)&&i[2]&&i[2].length&&($._unwatchOld=t.$watch(i[2],
						function(e){
							v.translate=e,
							k()
						}))
					}elsev.translate=r
				}elsev.translate=e;k()
			},
			y=function(e){
				g.$observe(e,
				function(t){
					v[e]=t,
					k()
				})
			};m(t.interpolateParams,
			g,
			u);varb=!0;g.$observe("translate",
			function(e){
				"undefined"==typeofe?$(""): ""===e&&b||(v.translate=e,
				k()),
				b=!1
			});for(varCing)g.hasOwnProperty(C)&&"translateAttr"===C.substr(0,
			13)&&y(C);if(g.$observe("translateDefault",
			function(e){
				t.defaultText=e
			}),
			l&&g.$observe("translateValues",
			function(e){
				e&&t.$parent.$watch(function(){
					angular.extend(t.interpolateParams,
					a(e)(t.$parent))
				})
			}),
			f){
				varw=function(e){
					g.$observe(e,
					function(n){
						varr=angular.lowercase(e.substr(14,
						1))+e.substr(15);t.interpolateParams[r]=n
					})
				};for(varxing)Object.prototype.hasOwnProperty.call(g,
				x)&&"translateValue"===x.substr(0,
				14)&&"translateValues"!==x&&w(x)
			}vark=function(){
				for(vareinv)v.hasOwnProperty(e)&&void0!==v[e]&&S(e,
				v[e],
				t,
				t.interpolateParams,
				t.defaultText,
				t.translateNamespace);
			},
			S=function(t,
			n,
			r,
			a,
			i,
			o){
				n?(o&&"."===n.charAt(0)&&(n=o+n),
				e(n,
				a,
				c,
				i).then(function(e){
					A(e,
					r,
					!0,
					t)
				},
				function(e){
					A(e,
					r,
					!1,
					t)
				})): A(n,
				r,
				!1,
				t)
			},
			A=function(t,
			n,
			a,
			i){
				if("translate"===i){
					a||"undefined"==typeofn.defaultText||(t=n.defaultText),
					h.empty().append(n.preText+t+n.postText);varo=e.isPostCompilingEnabled(),
					s="undefined"!=typeofu.translateCompile,
					l=s&&"false"!==u.translateCompile;(o&&!s||l)&&r(h.contents())(n)
				}else{
					a||"undefined"==typeofn.defaultText||(t=n.defaultText);varc=g.$attr[i];"data-"===c.substr(0,
					5)&&(c=c.substr(5)),
					c=c.substr(15),
					h.attr(c,
					t)
				}
			};(l||f||g.translateDefault)&&t.$watch("interpolateParams",
			k,
			!0);varD=o.$on("$translateChangeSuccess",
			k);h.text().length?$(g.translate?g.translate: ""): g.translate&&$(g.translate),
			k(),
			t.$on("$destroy",
			D)
		}
	}
}
}functioni(e){
"use strict";returne.translateNamespace?e.translateNamespace: e.$parent?i(e.$parent): void0
}functiono(e){
"use strict";return{
	compile: function(t){
		varn=function(){
			t.addClass(e.cloakClassName())
		},
		r=function(){
			t.removeClass(e.cloakClassName())
		};returne.onReady(function(){
			r()
		}),
		n(),
		function(t,
		a,
		i){
			i.translateCloak&&i.translateCloak.length&&i.$observe("translateCloak",
			function(t){
				e(t).then(r,
				n)
			})
		}
	}
}
}functions(){
"use strict";return{
	restrict: "A",
	scope: !0,
	compile: function(){
		return{
			pre: function(e,
			t,
			n){
				e.translateNamespace=i(e),
				e.translateNamespace&&"."===n.translateNamespace.charAt(0)?e.translateNamespace+=n.translateNamespace: e.translateNamespace=n.translateNamespace
			}
		}
	}
}
}functioni(e){
"use strict";returne.translateNamespace?e.translateNamespace: e.$parent?i(e.$parent): void0
}functionu(e,
t){
"use strict";varn=function(n,
r,
a){
	returnangular.isObject(r)||(r=e(r)(this)),
	t.instant(n,
	r,
	a)
};returnt.statefulFilter()&&(n.$stateful=!0),
n
}functionl(e){
"use strict";returne("translations")
}returnangular.module("pascalprecht.translate",
["ng"]).run(e),
e.$inject=["$translate"],
e.displayName="runTranslate",
angular.module("pascalprecht.translate").provider("$translateSanitization",
t),
angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider",
{

}).provider("$translate",
n),
n.$inject=["$STORAGE_KEY",
"$windowProvider",
"$translateSanitizationProvider",
"pascalprechtTranslateOverrider"],
n.displayName="displayName",
angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation",
r),
r.$inject=["$interpolate",
"$translateSanitization"],
r.displayName="$translateDefaultInterpolation",
angular.module("pascalprecht.translate").constant("$STORAGE_KEY",
"NG_TRANSLATE_LANG_KEY"),
angular.module("pascalprecht.translate").directive("translate",
a),
a.$inject=["$translate",
"$q",
"$interpolate",
"$compile",
"$parse",
"$rootScope"],
a.displayName="translateDirective",
angular.module("pascalprecht.translate").directive("translateCloak",
o),
o.$inject=["$translate"],
o.displayName="translateCloakDirective",
angular.module("pascalprecht.translate").directive("translateNamespace",
s),
s.displayName="translateNamespaceDirective",
angular.module("pascalprecht.translate").filter("translate",
u),
u.$inject=["$parse",
"$translate"],
u.displayName="translateFilterFactory",
angular.module("pascalprecht.translate").factory("$translationCache",
l),
l.$inject=["$cacheFactory"],
l.displayName="$translationCache",
"pascalprecht.translate"
}),
angular.module("ui.bootstrap",
["ui.bootstrap.tpls",
"ui.bootstrap.carousel"]),
angular.module("ui.bootstrap.tpls",
["template/carousel/carousel.html",
"template/carousel/slide.html"]),
angular.module("ui.bootstrap.carousel",
[]).controller("CarouselController",
["$scope",
"$element",
"$interval",
"$animate",
function(e,
t,
n,
r){
functiona(t,
n,
a){
m||(angular.extend(t,
{
	direction: a,
	active: !0
}),
angular.extend(f.currentSlide||{
	
},
{
	direction: a,
	active: !1
}),
r.enabled()&&!e.noTransition&&!e.$currentTransition&&t.$element&&f.slides.length>1&&(t.$element.data(g,
t.direction),
f.currentSlide&&f.currentSlide.$element&&f.currentSlide.$element.data(g,
t.direction),
e.$currentTransition=!0,
p?r.on("addClass",
t.$element,
function(t,
n){
	"close"===n&&(e.$currentTransition=null,
	r.off("addClass",
	t))
}): t.$element.one("$animate:close",
function(){
	e.$currentTransition=null
})),
f.currentSlide=t,
v=n,
o())
}functioni(e){
if(angular.isUndefined(d[e].index))returnd[e];vart;d.length;for(t=0;t<d.length;++t)if(d[t].index==e)returnd[t]
}functiono(){
s();vart=+e.interval;!isNaN(t)&&t>0&&(l=n(u,
t))
}functions(){
l&&(n.cancel(l),
l=null)
}functionu(){
vart=+e.interval;c&&!isNaN(t)&&t>0&&d.length?e.next(): e.pause()
}varl,
c,
f=this,
d=f.slides=e.slides=[],
p=angular.version.minor>=4,
h="uib-noTransition",
g="uib-slideDirection",
v=-1;f.currentSlide=null;varm=!1;f.select=e.select=function(t,
n){
varr=e.indexOfSlide(t);void0===n&&(n=r>f.getCurrentIndex()?"next": "prev"),
t&&t!==f.currentSlide&&!e.$currentTransition&&a(t,
r,
n)
},
e.$on("$destroy",
function(){
m=!0
}),
f.getCurrentIndex=function(){
returnf.currentSlide&&angular.isDefined(f.currentSlide.index)?+f.currentSlide.index: v
},
e.indexOfSlide=function(e){
returnangular.isDefined(e.index)?+e.index: d.indexOf(e)
},
e.next=function(){
vart=(f.getCurrentIndex()+1)%d.length;return0===t&&e.noWrap()?voide.pause(): f.select(i(t),
"next")
},
e.prev=function(){
vart=f.getCurrentIndex()-1<0?d.length-1: f.getCurrentIndex()-1;returne.noWrap()&&t===d.length-1?voide.pause(): f.select(i(t),
"prev")
},
e.isActive=function(e){
returnf.currentSlide===e
},
e.$watch("interval",
o),
e.$on("$destroy",
s),
e.play=function(){
c||(c=!0,
o())
},
e.pause=function(){
e.noPause||(c=!1,
s())
},
f.addSlide=function(t,
n){
t.$element=n,
d.push(t),
1===d.length||t.active?(f.select(d[d.length-1]),
1==d.length&&e.play()): t.active=!1
},
f.removeSlide=function(e){
angular.isDefined(e.index)&&d.sort(function(e,
t){
	return+e.index>+t.index
});vart=d.indexOf(e);d.splice(t,
1),
d.length>0&&e.active?t>=d.length?f.select(d[t-1]): f.select(d[t]): v>t&&v--,
0===d.length&&(f.currentSlide=null)
},
e.$watch("noTransition",
function(e){
t.data(h,
e)
})
}]).directive("carousel",
[function(){
return{
restrict: "EA",
transclude: !0,
replace: !0,
controller: "CarouselController",
controllerAs: "carousel",
require: "carousel",
templateUrl: function(e,
t){
	returnt.templateUrl||"template/carousel/carousel.html"
},
scope: {
	interval: "=",
	noTransition: "=",
	noPause: "=",
	noWrap: "&"
}
}
}]).directive("slide",
function(){
return{
require: "^carousel",
restrict: "EA",
transclude: !0,
replace: !0,
templateUrl: function(e,
t){
	returnt.templateUrl||"template/carousel/slide.html"
},
scope: {
	active: "=?",
	actual: "=?",
	index: "=?"
},
link: function(e,
t,
n,
r){
	r.addSlide(e,
	t),
	e.$on("$destroy",
	function(){
		r.removeSlide(e)
	}),
	e.$watch("active",
	function(t){
		t&&(r.select(e),
		e.fullsize=r.slides.length<2)
	})
}
}
}).animation(".item",
["$injector",
"$animate",
function(e,
t){
functionn(e,
t,
n){
e.removeClass(t),
n&&n()
}varr="uib-noTransition",
a="uib-slideDirection",
i=null;returne.has("$animateCss")&&(i=e.get("$animateCss")),
{
beforeAddClass: function(e,
o,
s){
	if("active"==o&&e.parent()&&!e.parent().data(r)){
		varu=!1,
		l=e.data(a),
		c="next"==l?"left": "right",
		f=n.bind(this,
		e,
		c+" "+l,
		s);returne.addClass(l),
		i?i(e,
		{
			addClass: c
		}).start().done(f): t.addClass(e,
		c).then(function(){
			u||f(),
			s()
		}),
		function(){
			u=!0
		}
	}s()
},
beforeRemoveClass: function(e,
o,
s){
	if("active"===o&&e.parent()&&!e.parent().data(r)){
		varu=!1,
		l=e.data(a),
		c="next"==l?"left": "right",
		f=n.bind(this,
		e,
		c,
		s);returni?i(e,
		{
			addClass: c
		}).start().done(f): t.addClass(e,
		c).then(function(){
			u||f(),
			s()
		}),
		function(){
			u=!0
		}
	}s()
}
}
}]),
angular.module("template/carousel/carousel.html",
[]).run(["$templateCache",
function(e){
e.put("template/carousel/carousel.html",
'<divng-mouseenter="pause()"ng-mouseleave="play()"class="carousel"ng-swipe-right="prev()"ng-swipe-left="next()"><divclass="carousel-inner"ng-transclude></div><divclass="control-left"><buttonng-click="prev()"ng-show="slides.length > 1"class="left carousel-control pager pager-icon"title="{{\'CarouselBack\'|i18n}}"aria-label="{{\'CarouselBack\'|i18n}}"><iclass="icon icon-navigation-left"aria-hidden="true"></i><spanclass="sr-only">{
{
	\'CarouselBack\'|i18n
}
}</span></button></div><divclass="control-right"><buttonng-click="next()"ng-show="slides.length > 1"class="right carousel-control pager pager-icon"title="{{\'CarouselNext\'|i18n}}"aria-label="{{\'CarouselNext\'|i18n}}"><iclass="icon icon-navigation-right"aria-hidden="true"></i><spanclass="sr-only">{
{
	\'CarouselNext\'|i18n
}
}</span></button></div><ulclass="pagination"ng-show="slides.length > 1"ng-style="{\'width\': ((slides.length) * 18) + \'px\'}"><ling-repeat="slide in slides | orderBy:indexOfSlide track by $index"ng-class="{active: isActive(slide)}"><ang-click="select(slide)"><spanclass="sr-only">{
{
	\'CarouselImage\'|i18n
}
}{
{
	$index+1
}
}</span></a></li></ul></div>')
}]),
angular.module("template/carousel/slide.html",
[]).run(["$templateCache",
function(e){
e.put("template/carousel/slide.html",
"<div ng-class=\"{\n    'active': active\n  }\" class=\"item text-center\" ng-style=\"fullsize ? {'padding': '0'} : {}\" ng-transclude></div>\n")
}]),
!angular.$$csp()&&angular.element(document).find("head").prepend('<styletype="text/css">.ng-animate.item: not(.left): not(.right){
-webkit-transition: 0sease-in-outleft;transition: 0sease-in-outleft
}</style>');//#sourceMappingURL=lib.js.map