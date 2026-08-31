const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BHZQoAnA.js",app:"_app/immutable/entry/app.CYlt4q4Y.js",imports:["_app/immutable/entry/start.BHZQoAnA.js","_app/immutable/chunks/DZ35o4gn.js","_app/immutable/chunks/PFakcHET.js","_app/immutable/chunks/mGi1enOe.js","_app/immutable/chunks/Cq2pY4Yd.js","_app/immutable/entry/app.CYlt4q4Y.js","_app/immutable/chunks/mGi1enOe.js","_app/immutable/chunks/Cq2pY4Yd.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/PFakcHET.js","_app/immutable/chunks/BnWEGwW2.js","_app/immutable/chunks/D2XnZijD.js","_app/immutable/chunks/n_r-uBlR.js","_app/immutable/chunks/BUUoNymH.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:true},
		nodes: [
			__memo(() => import('./chunks/0-DzhFMcAN.js')),
			__memo(() => import('./chunks/1-B6S6Nr-H.js')),
			__memo(() => import('./chunks/2-DedvrLY8.js')),
			__memo(() => import('./chunks/3-Ltjg8A7_.js')),
			__memo(() => import('./chunks/4-CUTpRFT1.js')),
			__memo(() => import('./chunks/5-BGALYwEz.js')),
			__memo(() => import('./chunks/6-xJNyWro-.js')),
			__memo(() => import('./chunks/7-A-TIlCop.js')),
			__memo(() => import('./chunks/8-CVh9iHpb.js')),
			__memo(() => import('./chunks/9-Dt4R5oYg.js')),
			__memo(() => import('./chunks/10-CC3I6YUf.js')),
			__memo(() => import('./chunks/11-CANV6j1h.js')),
			__memo(() => import('./chunks/12-BQPEwlcq.js')),
			__memo(() => import('./chunks/13-EXWbCr4u.js')),
			__memo(() => import('./chunks/14-ExbLCTLr.js')),
			__memo(() => import('./chunks/15-Bj55xgLv.js')),
			__memo(() => import('./chunks/16-KRdUlS27.js')),
			__memo(() => import('./chunks/17-CNGUKLnS.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(auth)/callback",
				pattern: /^\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/(app)/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(app)/dashboard/api-keys",
				pattern: /^\/dashboard\/api-keys\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/dashboard/settings",
				pattern: /^\/dashboard\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/dashboard/subscription",
				pattern: /^\/dashboard\/subscription\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/docs",
				pattern: /^\/docs\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(auth)/forgot-password",
				pattern: /^\/forgot-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/pricing",
				pattern: /^\/pricing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(auth)/reset-password",
				pattern: /^\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/terms",
				pattern: /^\/terms\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/(auth)/verify",
				pattern: /^\/verify\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
