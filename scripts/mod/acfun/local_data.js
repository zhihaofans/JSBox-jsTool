let cacheIdList = require("../../init").pref_cache_list,
  SQLite = require("./data-base").SQLite,
  Login = {
    saveLoginData: loginData => {
      if (loginData) {
        SQLite.acPassToken(loginData["acPassToken"]);
        SQLite.uid(loginData["userid"]);
        SQLite.token(loginData["token"]);
        SQLite.access_token(loginData["token"]);
        SQLite.username(loginData["username"]);
        SQLite.acSecurity(loginData["acSecurity"]);
        $cache.set(
          cacheIdList["mod.acfun.auth.acpasstoken"],
          loginData["acPassToken"]
        );
        $cache.set(
          cacheIdList["mod.acfun.auth.uid"],
          loginData["userid"] || undefined
        );
        $cache.set(
          cacheIdList["mod.acfun.auth.token"],
          loginData["token"] || undefined
        );
        $cache.set(
          cacheIdList["mod.acfun.auth.access_token"],
          loginData["token"] || undefined
        );
        $cache.set(
          cacheIdList["mod.acfun.auth.username"],
          loginData["username"] || undefined
        );
        $cache.set(
          cacheIdList["mod.acfun.auth.acsecurity"],
          loginData["acSecurity"] || undefined
        );
        $cache.remove(cacheIdList["mod.acfun.auth.login.id"]);
        $cache.remove(cacheIdList["mod.acfun.auth.login.password"]);
        $prefs.set("mod.acfun.auth.login.id", undefined);
        $prefs.set("mod.acfun.auth.login.password", undefined);
      } else {
        $console.error("保存登录数据失败");
      }
    },
    loadLoginData: () => {
      const token =
          SQLite.token() ||
          $cache.get(cacheIdList["mod.acfun.auth.token"]) ||
          undefined,
        acPassToken =
          SQLite.acPassToken() ||
          $cache.get(cacheIdList["mod.acfun.auth.acpasstoken"]) ||
          undefined,
        access_token =
          SQLite.access_token() ||
          $cache.get(cacheIdList["mod.acfun.auth.access_token"]) ||
          undefined,
        uid =
          SQLite.uid() ||
          $cache.get(cacheIdList["mod.acfun.auth.uid"]) ||
          undefined,
        acSecurity =
          SQLite.acSecurity() ||
          $cache.get(cacheIdList["mod.acfun.auth.acsecurity"]) ||
          undefined,
        username =
          SQLite.username() ||
          $cache.get(cacheIdList["mod.acfun.auth.username"]) ||
          undefined;
      return {
        token: token,
        acPassToken: acPassToken,
        access_token: access_token,
        userid: uid,
        acSecurity: acSecurity,
        username: username
      };
    }
  };
module.exports = {
  Login
};
