(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{320:function(t,e,r){"use strict";r.d(e,"a",(function(){return w}));var i=r(58),n=r(0),s=r(2),o=r.n(s),a=r(36),u=r.n(a),c=r(16),p=r(11),l=r(3),b=function(){function t(t,e){this.isMounted=!1,this.previousOptions={},this.context={},this.options={},this.options=t||{},this.context=e||{}}return t.prototype.getOptions=function(){return this.options},t.prototype.setOptions=function(t,e){void 0===e&&(e=!1),e&&!Object(p.a)(this.options,t)&&(this.previousOptions=this.options),this.options=t},t.prototype.unmount=function(){this.isMounted=!1},t.prototype.refreshClient=function(){var t=this.options&&this.options.client||this.context&&this.context.client;Object(l.b)(!!t,2);var e=!1;return t!==this.client&&(e=!0,this.client=t,this.cleanup()),{client:this.client,isNew:e}},t.prototype.verifyDocumentType=function(t,e){var r=Object(i.f)(t);Object(i.e)(e),Object(i.e)(r.type);Object(l.b)(r.type===e,3)},t}(),h=function(t){function e(e){var r=e.options,i=e.context,n=e.forceUpdate,s=t.call(this,r,i)||this;return s.previousData={},s.currentObservable={},s.runLazy=!1,s.runLazyQuery=function(t){s.cleanup(),s.runLazy=!0,s.lazyOptions=t,s.forceUpdate()},s.getExecuteResult=function(){var t=s.getQueryResult();return s.startQuerySubscription(),t},s.obsRefetch=function(t){return s.currentObservable.query.refetch(t)},s.obsFetchMore=function(t){return s.currentObservable.query.fetchMore(t)},s.obsUpdateQuery=function(t){return s.currentObservable.query.updateQuery(t)},s.obsStartPolling=function(t){s.currentObservable&&s.currentObservable.query&&s.currentObservable.query.startPolling(t)},s.obsStopPolling=function(){s.currentObservable&&s.currentObservable.query&&s.currentObservable.query.stopPolling()},s.obsSubscribeToMore=function(t){return s.currentObservable.query.subscribeToMore(t)},s.forceUpdate=n,s}return Object(n.c)(e,t),e.prototype.execute=function(){this.refreshClient();var t=this.getOptions(),e=t.skip,r=t.query;return(e||r!==this.previousData.query)&&(this.removeQuerySubscription(),this.previousData.query=r),this.updateObservableQuery(),this.isMounted&&this.startQuerySubscription(),this.getExecuteSsrResult()||this.getExecuteResult()},e.prototype.executeLazy=function(){return this.runLazy?[this.runLazyQuery,this.execute()]:[this.runLazyQuery,{loading:!1,networkStatus:c.b.ready,called:!1,data:void 0}]},e.prototype.fetchData=function(){var t=this.getOptions();if(t.skip||!1===t.ssr)return!1;var e=this.currentObservable.query;return!!e.getCurrentResult().loading&&e.result()},e.prototype.afterExecute=function(t){var e=this,r=(void 0===t?{}:t).lazy,i=void 0!==r&&r;return this.isMounted=!0,i&&!this.runLazy||(this.handleErrorOrCompleted(),setTimeout((function(){e.currentObservable.query&&e.currentObservable.query.resetQueryStoreErrors()}))),this.previousOptions=this.getOptions(),this.unmount.bind(this)},e.prototype.cleanup=function(){this.removeQuerySubscription(),delete this.currentObservable.query,delete this.previousData.result},e.prototype.getOptions=function(){var e=t.prototype.getOptions.call(this);return this.lazyOptions&&(e.variables=Object(n.a)(Object(n.a)({},e.variables),this.lazyOptions.variables),e.context=Object(n.a)(Object(n.a)({},e.context),this.lazyOptions.context)),this.runLazy&&delete e.skip,e},e.prototype.getExecuteSsrResult=function(){var t,e=this.context&&this.context.renderPromises,r=!1===this.getOptions().ssr,i=this.refreshClient().client.disableNetworkFetches,n={loading:!0,networkStatus:c.b.loading,called:!0,data:void 0};return r&&(e||i)?n:(e&&(t=this.context.renderPromises.addQueryPromise(this,this.getExecuteResult)||n),t)},e.prototype.prepareObservableQueryOptions=function(){var t=this.getOptions();this.verifyDocumentType(t.query,i.c.Query);var e=t.displayName||"Query";return this.context&&this.context.renderPromises&&("network-only"===t.fetchPolicy||"cache-and-network"===t.fetchPolicy)&&(t.fetchPolicy="cache-first"),Object(n.a)(Object(n.a)({},t),{displayName:e,context:t.context,metadata:{reactComponent:{displayName:e}}})},e.prototype.initializeObservableQuery=function(){if(this.context&&this.context.renderPromises&&(this.currentObservable.query=this.context.renderPromises.getSSRObservable(this.getOptions())),!this.currentObservable.query){var t=this.prepareObservableQueryOptions();this.previousData.observableQueryOptions=Object(n.a)(Object(n.a)({},t),{children:null}),this.currentObservable.query=this.refreshClient().client.watchQuery(Object(n.a)({},t)),this.context&&this.context.renderPromises&&this.context.renderPromises.registerSSRObservable(this.currentObservable.query,t)}},e.prototype.updateObservableQuery=function(){if(this.currentObservable.query){var t=Object(n.a)(Object(n.a)({},this.prepareObservableQueryOptions()),{children:null});Object(p.a)(t,this.previousData.observableQueryOptions)||(this.previousData.observableQueryOptions=t,this.currentObservable.query.setOptions(t).catch((function(){})))}else this.initializeObservableQuery()},e.prototype.startQuerySubscription=function(){var t=this;if(!this.currentObservable.subscription&&!this.getOptions().skip){var e=this.currentObservable.query;this.currentObservable.subscription=e.subscribe({next:function(e){var r=e.loading,i=e.networkStatus,n=e.data,s=t.previousData.result;s&&s.loading===r&&s.networkStatus===i&&Object(p.a)(s.data,n)||t.forceUpdate()},error:function(e){if(t.resubscribeToQuery(),!e.hasOwnProperty("graphQLErrors"))throw e;var r=t.previousData.result;(r&&r.loading||!Object(p.a)(e,t.previousData.error))&&(t.previousData.error=e,t.forceUpdate())}})}},e.prototype.resubscribeToQuery=function(){this.removeQuerySubscription();var t=this.currentObservable.query.getLastError(),e=this.currentObservable.query.getLastResult();this.currentObservable.query.resetLastResults(),this.startQuerySubscription(),Object.assign(this.currentObservable.query,{lastError:t,lastResult:e})},e.prototype.getQueryResult=function(){var t=this.observableQueryFields(),e=this.getOptions();if(e.skip)t=Object(n.a)(Object(n.a)({},t),{data:void 0,error:void 0,loading:!1,called:!0});else{var r=this.currentObservable.query.getCurrentResult(),i=r.loading,s=r.partial,o=r.networkStatus,a=r.errors,u=r.error,p=r.data;if(a&&a.length>0&&(u=new c.a({graphQLErrors:a})),t=Object(n.a)(Object(n.a)({},t),{loading:i,networkStatus:o,error:u,called:!0}),i){var l=this.previousData.result&&this.previousData.result.data;t.data=l&&p?Object(n.a)(Object(n.a)({},l),p):l||p}else if(u)Object.assign(t,{data:(this.currentObservable.query.getLastResult()||{}).data});else{var b=this.currentObservable.query.options.fetchPolicy;if(e.partialRefetch&&!p&&s&&"cache-only"!==b)return Object.assign(t,{loading:!0,networkStatus:c.b.loading}),t.refetch(),t;t.data=p}}return t.client=this.client,this.previousData.loading=this.previousData.result&&this.previousData.result.loading||!1,this.previousData.result=t,t},e.prototype.handleErrorOrCompleted=function(){var t=this.currentObservable.query;if(t){var e=t.getCurrentResult(),r=e.data,i=e.loading,n=e.error;if(!i){var s=this.getOptions(),o=s.query,a=s.variables,u=s.onCompleted,c=s.onError;if(this.previousOptions&&!this.previousData.loading&&Object(p.a)(this.previousOptions.query,o)&&Object(p.a)(this.previousOptions.variables,a))return;u&&!n?u(r):c&&n&&c(n)}}},e.prototype.removeQuerySubscription=function(){this.currentObservable.subscription&&(this.currentObservable.subscription.unsubscribe(),delete this.currentObservable.subscription)},e.prototype.observableQueryFields=function(){return{variables:this.currentObservable.query.variables,refetch:this.obsRefetch,fetchMore:this.obsFetchMore,updateQuery:this.obsUpdateQuery,startPolling:this.obsStartPolling,stopPolling:this.obsStopPolling,subscribeToMore:this.obsSubscribeToMore}},e}(b);function f(t,e,r){void 0===r&&(r=!1);var o=Object(s.useContext)(Object(i.d)()),a=Object(s.useReducer)((function(t){return t+1}),0),u=a[0],c=a[1],l=e?Object(n.a)(Object(n.a)({},e),{query:t}):{query:t},b=Object(s.useRef)();b.current||(b.current=new h({options:l,context:o,forceUpdate:c}));var f=b.current;f.setOptions(l),f.context=o;var v=function(t,e){var r=Object(s.useRef)();return r.current&&Object(p.a)(e,r.current.key)||(r.current={key:e,value:t()}),r.current.value}((function(){return r?f.executeLazy():f.execute()}),{options:Object(n.a)(Object(n.a)({},l),{onError:void 0,onCompleted:void 0}),context:o,tick:u}),d=r?v[1]:v;return Object(s.useEffect)((function(){return f.afterExecute({lazy:r})}),[d.loading,d.networkStatus,d.error,d.data]),Object(s.useEffect)((function(){return function(){return f.cleanup()}}),[]),v}var v=function(t){function e(e){var r=e.options,n=e.context,s=e.result,o=e.setResult,a=t.call(this,r,n)||this;return a.runMutation=function(t){void 0===t&&(t={}),a.onMutationStart();var e=a.generateNewMutationId();return a.mutate(t).then((function(t){return a.onMutationCompleted(t,e),t})).catch((function(t){if(a.onMutationError(t,e),!a.getOptions().onError)throw t}))},a.verifyDocumentType(r.mutation,i.c.Mutation),a.result=s,a.setResult=o,a.mostRecentMutationId=0,a}return Object(n.c)(e,t),e.prototype.execute=function(t){return this.isMounted=!0,this.verifyDocumentType(this.getOptions().mutation,i.c.Mutation),t.client=this.refreshClient().client,[this.runMutation,t]},e.prototype.afterExecute=function(){return this.isMounted=!0,this.unmount.bind(this)},e.prototype.cleanup=function(){},e.prototype.mutate=function(t){var e=this.getOptions(),r=e.mutation,i=e.variables,s=e.optimisticResponse,o=e.update,a=e.context,u=void 0===a?{}:a,c=e.awaitRefetchQueries,p=void 0!==c&&c,l=e.fetchPolicy,b=Object(n.a)({},t),h=Object.assign({},i,b.variables);return delete b.variables,this.refreshClient().client.mutate(Object(n.a)({mutation:r,optimisticResponse:s,refetchQueries:b.refetchQueries||this.getOptions().refetchQueries,awaitRefetchQueries:p,update:o,context:u,fetchPolicy:l,variables:h},b))},e.prototype.onMutationStart=function(){this.result.loading||this.getOptions().ignoreResults||this.updateResult({loading:!0,error:void 0,data:void 0,called:!0})},e.prototype.onMutationCompleted=function(t,e){var r=this.getOptions(),i=r.onCompleted,n=r.ignoreResults,s=t.data,o=t.errors,a=o&&o.length>0?new c.a({graphQLErrors:o}):void 0;this.isMostRecentMutation(e)&&!n&&this.updateResult({called:!0,loading:!1,data:s,error:a}),i&&i(s)},e.prototype.onMutationError=function(t,e){var r=this.getOptions().onError;this.isMostRecentMutation(e)&&this.updateResult({loading:!1,error:t,data:void 0,called:!0}),r&&r(t)},e.prototype.generateNewMutationId=function(){return++this.mostRecentMutationId},e.prototype.isMostRecentMutation=function(t){return this.mostRecentMutationId===t},e.prototype.updateResult=function(t){!this.isMounted||this.previousResult&&Object(p.a)(this.previousResult,t)||(this.setResult(t),this.previousResult=t)},e}(b);var d=function(t){function e(e){var r=e.options,i=e.context,n=e.setResult,s=t.call(this,r,i)||this;return s.currentObservable={},s.setResult=n,s.initialize(r),s}return Object(n.c)(e,t),e.prototype.execute=function(t){if(!0===this.getOptions().skip)return this.cleanup(),{loading:!1,error:void 0,data:void 0,variables:this.getOptions().variables};var e=t;this.refreshClient().isNew&&(e=this.getLoadingResult());var r=this.getOptions().shouldResubscribe;return"function"===typeof r&&(r=!!r(this.getOptions())),!1!==r&&this.previousOptions&&Object.keys(this.previousOptions).length>0&&(this.previousOptions.subscription!==this.getOptions().subscription||!Object(p.a)(this.previousOptions.variables,this.getOptions().variables)||this.previousOptions.skip!==this.getOptions().skip)&&(this.cleanup(),e=this.getLoadingResult()),this.initialize(this.getOptions()),this.startSubscription(),this.previousOptions=this.getOptions(),Object(n.a)(Object(n.a)({},e),{variables:this.getOptions().variables})},e.prototype.afterExecute=function(){this.isMounted=!0},e.prototype.cleanup=function(){this.endSubscription(),delete this.currentObservable.query},e.prototype.initialize=function(t){this.currentObservable.query||!0===this.getOptions().skip||(this.currentObservable.query=this.refreshClient().client.subscribe({query:t.subscription,variables:t.variables,fetchPolicy:t.fetchPolicy}))},e.prototype.startSubscription=function(){this.currentObservable.subscription||(this.currentObservable.subscription=this.currentObservable.query.subscribe({next:this.updateCurrentData.bind(this),error:this.updateError.bind(this),complete:this.completeSubscription.bind(this)}))},e.prototype.getLoadingResult=function(){return{loading:!0,error:void 0,data:void 0}},e.prototype.updateResult=function(t){this.isMounted&&this.setResult(t)},e.prototype.updateCurrentData=function(t){var e=this.getOptions().onSubscriptionData;this.updateResult({data:t.data,loading:!1,error:void 0}),e&&e({client:this.refreshClient().client,subscriptionData:t})},e.prototype.updateError=function(t){this.updateResult({error:t,loading:!1})},e.prototype.completeSubscription=function(){var t=this.getOptions().onSubscriptionComplete;t&&t(),this.endSubscription()},e.prototype.endSubscription=function(){this.currentObservable.subscription&&(this.currentObservable.subscription.unsubscribe(),delete this.currentObservable.subscription)},e}(b);!function(){function t(){this.queryPromises=new Map,this.queryInfoTrie=new Map}t.prototype.registerSSRObservable=function(t,e){this.lookupQueryInfo(e).observable=t},t.prototype.getSSRObservable=function(t){return this.lookupQueryInfo(t).observable},t.prototype.addQueryPromise=function(t,e){return this.lookupQueryInfo(t.getOptions()).seen?e():(this.queryPromises.set(t.getOptions(),new Promise((function(e){e(t.fetchData())}))),null)},t.prototype.hasPromises=function(){return this.queryPromises.size>0},t.prototype.consumeAndAwaitPromises=function(){var t=this,e=[];return this.queryPromises.forEach((function(r,i){t.lookupQueryInfo(i).seen=!0,e.push(r)})),this.queryPromises.clear(),Promise.all(e)},t.prototype.lookupQueryInfo=function(t){var e=this.queryInfoTrie,r=t.query,i=t.variables,n=e.get(r)||new Map;e.has(r)||e.set(r,n);var s=JSON.stringify(i),o=n.get(s)||{seen:!1,observable:null};return n.has(s)||n.set(s,o),o}}();var O=r(14),y=r.n(O);function g(t){var e=t.children,r=function(t,e){return f(t,e,!1)}(t.query,Object(n.e)(t,["children","query"]));return e&&r?e(r):null}function j(t){var e=function(t,e){var r=Object(s.useContext)(Object(i.d)()),o=Object(s.useState)({called:!1,loading:!1}),a=o[0],u=o[1],c=e?Object(n.a)(Object(n.a)({},e),{mutation:t}):{mutation:t},p=Object(s.useRef)(),l=(p.current||(p.current=new v({options:c,context:r,result:a,setResult:u})),p.current);return l.setOptions(c),l.context=r,Object(s.useEffect)((function(){return l.afterExecute()})),l.execute(a)}(t.mutation,t),r=e[0],o=e[1];return t.children?t.children(r,o):null}function m(t){var e=function(t,e){var r=Object(s.useContext)(Object(i.d)()),o=e?Object(n.a)(Object(n.a)({},e),{subscription:t}):{subscription:t},a=Object(s.useState)({loading:!o.skip,error:void 0,data:void 0}),u=a[0],c=a[1],p=Object(s.useRef)(),l=(p.current||(p.current=new d({options:o,context:r,setResult:c})),p.current);return l.setOptions(o,!0),l.context=r,Object(s.useEffect)((function(){return l.afterExecute()})),Object(s.useEffect)((function(){return l.cleanup.bind(l)}),[]),l.execute(u)}(t.subscription,t);return t.children&&e?t.children(e):null}(g||(g={})).propTypes={client:y.a.object,children:y.a.func.isRequired,fetchPolicy:y.a.string,notifyOnNetworkStatusChange:y.a.bool,onCompleted:y.a.func,onError:y.a.func,pollInterval:y.a.number,query:y.a.object.isRequired,variables:y.a.object,ssr:y.a.bool,partialRefetch:y.a.bool,returnPartialData:y.a.bool},(j||(j={})).propTypes={mutation:y.a.object.isRequired,variables:y.a.object,optimisticResponse:y.a.oneOfType([y.a.object,y.a.func]),refetchQueries:y.a.oneOfType([y.a.arrayOf(y.a.oneOfType([y.a.string,y.a.object])),y.a.func]),awaitRefetchQueries:y.a.bool,update:y.a.func,children:y.a.func.isRequired,onCompleted:y.a.func,onError:y.a.func,fetchPolicy:y.a.string},(m||(m={})).propTypes={subscription:y.a.object.isRequired,variables:y.a.object,children:y.a.func,onSubscriptionData:y.a.func,onSubscriptionComplete:y.a.func,shouldResubscribe:y.a.oneOfType([y.a.func,y.a.bool])};var R=function(){return{}},q=function(){return!1};function x(t){return t.displayName||t.name||"Component"}function Q(t,e){for(var r={},i=0,n=t.variables;i<n.length;i++){var s=n[i],o=s.variable,a=s.type;if(o.name&&o.name.value){var u=o.name.value,c=e[u];"undefined"===typeof c?"NonNullType"!==a.kind&&(r[u]=void 0):r[u]=c}}return r}var S=function(t){function e(e){var r=t.call(this,e)||this;return r.withRef=!1,r.setWrappedInstance=r.setWrappedInstance.bind(r),r}return Object(n.c)(e,t),e.prototype.getWrappedInstance=function(){return Object(l.b)(this.withRef,2),this.wrappedInstance},e.prototype.setWrappedInstance=function(t){this.wrappedInstance=t},e}(o.a.Component);function w(t,e){switch(void 0===e&&(e={}),Object(i.f)(t).type){case i.c.Mutation:return function(t,e){void 0===e&&(e={});var r=Object(i.f)(t),s=e.options,a=void 0===s?R:s,c=e.alias,p=void 0===c?"Apollo":c,l=a;return"function"!==typeof l&&(l=function(){return a}),function(i){var s=p+"("+x(i)+")",a=function(a){function u(){return null!==a&&a.apply(this,arguments)||this}return Object(n.c)(u,a),u.prototype.render=function(){var s=this.props,a=l(s);return e.withRef&&(this.withRef=!0,s=Object.assign({},s,{ref:this.setWrappedInstance})),!a.variables&&r.variables.length>0&&(a.variables=Q(r,s)),o.a.createElement(j,Object(n.a)({ignoreResults:!0},a,{mutation:t}),(function(t,r){var a,u,c=r.data,p=Object(n.e)(r,["data"]),l=Object.assign(p,c||{}),b=e.name||"mutate",h=e.name?b+"Result":"result",f=((a={})[b]=t,a[h]=l,a);if(e.props){var v=((u={})[b]=t,u[h]=l,u.ownProps=s,u);f=e.props(v)}return o.a.createElement(i,Object(n.a)({},s,f))}))},u.displayName=s,u.WrappedComponent=i,u}(S);return u()(a,i,{})}}(t,e);case i.c.Subscription:return function(t,e){void 0===e&&(e={});var r=Object(i.f)(t),s=e.options,a=void 0===s?R:s,c=e.skip,p=void 0===c?q:c,l=e.alias,b=void 0===l?"Apollo":l,h=e.shouldResubscribe,f=a;"function"!==typeof f&&(f=function(){return a});var v,d=p;return"function"!==typeof d&&(d=function(){return p}),function(i){var s=b+"("+x(i)+")",a=function(a){function u(t){var e=a.call(this,t)||this;return e.state={resubscribe:!1},e}return Object(n.c)(u,a),u.prototype.componentDidUpate=function(t){h&&this.setState({resubscribe:h(t,this.props)})},u.prototype.render=function(){var a=this,u=this.props,c=d(u),p=c?Object.create(null):f(u);return!c&&!p.variables&&r.variables.length>0&&(p.variables=Q(r,u)),o.a.createElement(m,Object(n.a)({},p,{displayName:s,skip:c,subscription:t,shouldResubscribe:this.state.resubscribe}),(function(t){var r,s,p=t.data,l=Object(n.e)(t,["data"]);if(e.withRef&&(a.withRef=!0,u=Object.assign({},u,{ref:a.setWrappedInstance})),c)return o.a.createElement(i,Object(n.a)({},u,{}));var b=Object.assign(l,p||{}),h=e.name||"data",f=((r={})[h]=b,r);if(e.props){var d=((s={})[h]=b,s.ownProps=u,s);f=v=e.props(d,v)}return o.a.createElement(i,Object(n.a)({},u,f))}))},u.displayName=s,u.WrappedComponent=i,u}(S);return u()(a,i,{})}}(t,e);case i.c.Query:default:return function(t,e){void 0===e&&(e={});var r=Object(i.f)(t),s=e.options,a=void 0===s?R:s,c=e.skip,p=void 0===c?q:c,l=e.alias,b=void 0===l?"Apollo":l,h=a;"function"!==typeof h&&(h=function(){return a});var f,v=p;return"function"!==typeof v&&(v=function(){return p}),function(i){var s=b+"("+x(i)+")",a=function(a){function u(){return null!==a&&a.apply(this,arguments)||this}return Object(n.c)(u,a),u.prototype.render=function(){var a=this,u=this.props,c=v(u),p=c?Object.create(null):Object(n.a)({},h(u));return!c&&!p.variables&&r.variables.length>0&&(p.variables=Q(r,u)),o.a.createElement(g,Object(n.a)({},p,{displayName:s,skip:c,query:t}),(function(t){t.client;var r,s,p=t.data,l=Object(n.e)(t,["client","data"]);if(e.withRef&&(a.withRef=!0,u=Object.assign({},u,{ref:a.setWrappedInstance})),c)return o.a.createElement(i,Object(n.a)({},u,{}));var b=Object.assign(l,p||{}),h=e.name||"data",v=((r={})[h]=b,r);if(e.props){var d=((s={})[h]=b,s.ownProps=u,s);v=f=e.props(d,f)}return o.a.createElement(i,Object(n.a)({},u,v))}))},u.displayName=s,u.WrappedComponent=i,u}(S);return u()(a,i,{})}}(t,e)}}},68:function(t,e,r){"use strict";function i(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}r.d(e,"a",(function(){return i}))}}]);
//# sourceMappingURL=0.0c771c19.chunk.js.map