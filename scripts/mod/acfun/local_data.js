let cacheIdList = require("../../init").pref_cache_list,
  SQLite = "./data-base",
  Login = {
    saveLoginData: loginData => {
      if (loginData) {
        SQLite.acPassToken(loginData["acPassToken"]);SQLite.us(loginData["acPassToken"]);SQLite.acPassToken(loginData["acPassToken"]);SQLite.acPassToken(loginData["acPassToken"]);SQLite.acPassToken(loginData["acPassToken"]);SQLite.acPassToken(loginData["acPassToken"]);
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
      return {
        acPassToken:
          $cache.get(cacheIdList["mod.acfun.auth.acpasstoken"]) || "",
        access_token:
          $cache.get(cacheIdList["mod.acfun.auth.access_token"]) || "",
        userid: $cache.get(cacheIdList["mod.acfun.auth.uid"]) || "",
        acSecurity: $cache.get(cacheIdList["mod.acfun.auth.acsecurity"]) || "",
        username: $cache.get(cacheIdList["mod.acfun.auth.username"]) || ""
      };
    }
  };
module.exports = {
  Login
};
