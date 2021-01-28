<template>
    <div class="container border">
        <div class="row">
            <div class="col"><br>
                <h1>Delete your account</h1><br>
                <p>Password required:</p>
                <input type="password" id="password" v-model="password" class="starndard-input"><br><br>
                <button class="btn btn-danger btn-sm" @click="deleteAccount" placeholder="Password">Confirm Delete</button><br><br>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import cookies from 'vue-cookies'

    export default {
        name: 'delete-profile',
        data () {
            return {
            password: ""
            }
        },
        methods: {
            deleteAccount: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/users",
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        'X-Api-Key':  'QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC',
                    },
                    data: {
                        loginToken: cookies.get('session'),
                        password: this.password,
                    }
                }).then(() => {
                    this.$router.push({ name: 'SignupForm' })
                    cookies.delete('session')
                    // cookies.delete('userId')
                    console.log(cookies.get('session'))
                    

                }).catch((error) => {
                    console.log(error)
                })
            }
        },
    }
</script>

<style scoped>
    .container {
        background-color: rgb(20, 131, 223);
    }
</style>