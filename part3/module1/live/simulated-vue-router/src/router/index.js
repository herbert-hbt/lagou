import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from "../simulated-router"
import Home from '../views/Home.vue'
import Music from '../components/music/Music.vue'
import Pop from '../components/music/Pop.vue'
import Rock from '../components/music/Rock.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path: '/music',
    name: 'Music',
    component: Music,
    children: [{
        path: 'pop',
        name: 'Pop',
        component: Pop
    }, {
        path: 'rock',
        name: 'Rock',
        component: Rock
    }]
}, {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "about" */ '../views/About.vue')
}]

const router = new VueRouter({
    routes
})

export default router