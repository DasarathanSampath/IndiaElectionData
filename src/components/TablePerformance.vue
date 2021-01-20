<template>
        <div>       
            <div>            
                <table>
                    <thead>
                        <tr>
                            <th v-for="item in tableHead" :key="item">
                                {{item}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in displayedPosts" :key="item.id">
                            <td>{{ item.party }}</td>
                            <td>{{ item.contested }}</td>
                            <td>{{ item.won }}</td>
                            <td>{{ item.votes }}</td>
                        </tr>
                    </tbody>
                    <div class="pagination">
                        <button class="btn" v-if="page != 1" @click="page--"> Previous </button>
                        <button class="btn" 
                            v-for="(pageNumber, index) in pages" 
                            :class="{ 'active': index === (page-1)}"
                            @click="page = pageNumber" 
                            v-bind:key="index"
                        > 
                            {{pageNumber}}
                        </button>
                        <button class="btn" @click="page++" v-if="page < pages.length"> Next </button>
                    </div> 
                </table>                
            </div>            
        </div>
</template>

<script>

export default {
    props: {
        tableHead: {
            type: Array,
            required: true
        },
        posts: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            page: 1,
            perPage: 4,
            pages: []
        }
    },
    methods:{
        setPages () {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage)
            
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index)
            }
        },
        paginate (posts) {
            let page = this.page
            let perPage = this.perPage
            let from = (page * perPage) - perPage
            let to = (page * perPage)
            return posts.slice(from, to)
        }
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.posts)
        }
    },
    watch: {
        posts () {
            this.page = 1
            this.pages = []
            this.setPages()
        }
    },
    created () {
        this.setPages()
    }
}
</script>

<style scoped>

/* Style the active class, and buttons on mouse-over */
.active, .btn:hover, .btn:active {
    background-color: #666;
    color: white;
}

/* width */
::-webkit-scrollbar {
  width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #263959   ;
  border-radius: 10px;
}

</style>