<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { setUserFavorites } from '../requests/SetUserFavoritesRequest.js'
import { removeUserFavorites } from '../requests/RemoveUserFavoritesRequest.js'

export default {

    props: {
        level_id: String
    },

    computed: {
        ...mapState(useUserStore, ['accessToken']),
        isFavorited() {
            const userStore = useUserStore()
            return userStore.isFavorited(this.level_id)
        }
    },

    methods: {
        async addFavoriteLevel() {
            if (this.accessToken) {
                const userStore = useUserStore()
                const result = await setUserFavorites(this.$api_server_url, this.level_id, this.accessToken)
                if (result === true) {
                    userStore.appendFavoriteLevel(this.level_id)
                } else {
                    confirm("something went wrong when trying to add to favorites")
                }

            }
        },
        async removeFavoriteLevel() {
            if (this.accessToken) {
                const userStore = useUserStore()
                const result = await removeUserFavorites(this.$api_server_url, this.level_id, this.accessToken)
                if (result === true) {
                    userStore.detachFavoriteLevel(this.level_id)
                } else {
                    confirm("something went wrong when trying to remove this level from favorites")
                }
            }
        }
    }
}
</script>

<template>
    <img v-if="isFavorited" class="favorite-button" @click="removeFavoriteLevel" alt="favorited"
        src="./../assets/star_on.svg">
    <img v-else class="favorite-button" alt="favorite" @click="addFavoriteLevel" src="./../assets/star_off.svg">
</template>

<style>
.favorite-button {
    max-width: 10%;
    height: 30px;
    cursor: pointer;
    position: absolute;
    bottom: 5%;
}
</style>
