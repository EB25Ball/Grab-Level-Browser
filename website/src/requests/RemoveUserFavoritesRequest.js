export async function removeUserFavorites(server,levelID,accessToken) {
    await fetch(server + 'remove_favorite_level?level_id=' + levelID + '&access_token=' + accessToken)
    return true
  }
  