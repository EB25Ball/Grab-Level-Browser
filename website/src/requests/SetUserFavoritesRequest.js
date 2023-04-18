export async function setUserFavorites(server,levelID, accessToken) {
    await fetch(server + 'add_favorite_level?level_id=' + levelID + '&access_token='+accessToken)
    return true
  }
  