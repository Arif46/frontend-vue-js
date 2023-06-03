<template>
    <div class="section-wrapper">
      <div class="breadcrumb-wrapper">
        <br>
      </div>
        <div class="form-wrapper">
        <b-card title="Data Search Header">
          <b-card-text>
            <b-row>
              <b-col sm="12" md="4">
                <b-form-group
                    id="market"
                    label="Name"
                    label-for="name"
                >
                    <b-form-input
                    id="marketInput"
                    v-model="search.name"
                    type="text"
                    placeholder="Enter Name"
                    required
                    ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12" md="4">
                <br>
                <b-button size="sm" variant="primary"><i class="ri-search-line"></i> Search</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
    </div>
    <!---table-->
    <b-row>
      <div class="section-wrapper">
        <b-col  xs="12" sm="12" md="12" lg="12" xl="12">
          <b-card class="mt-5">
            <div class="table-wrapper table-responsive">
              <table class="table table-striped table-hover table-bordered">
                <b-overlay :show="loading">
                  <thead>
                    <tr>
                      <th scope="col" v-for="header in tableHeaders" :key="header" sortable>{{ capitalizeFirstLetter(header) }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in users" :key="index">
                      <td>{{ capitalizeFirstLetter(item.gender) }}</td>
                      <td>
                        {{ item.name.title }}
                        {{ item.name.first }}
                        {{ item.name.last }}
                      </td>
                      <td>
                        {{ item.location.street.number }}
                        {{ item.location.street.name }}
                        {{ item.location.city }}
                        {{ item.location.state }}
                        {{ item.location.country }}
                        {{ item.location.postcode }}
                        {{ item.location.coordinates.latitude }}
                        {{ item.location.coordinates.longitude }}
                        {{ item.location.timezone.offset }}
                        {{ item.location.timezone.description }}
                      </td>
                      <td>{{ item.email }}</td>
                      <td>
                        {{ item.login.uuid }}
                        {{ item.login.username }}
                        {{ item.login.password }}
                        {{ item.login.salt }}
                        {{ item.login.md5 }}
                        {{ item.login.sha1 }}
                        {{ item.login.sha256 }}
                      </td>
                      <td>
                        {{ item.dob.date }}
                        {{ item.dob.age }}
                      </td>
                      <td>
                        {{ item.registered.date }}
                        {{ item.registered.age }}
                      </td>
                      <td>{{ item.phone }}</td>
                      <td>{{ item.cell }}</td>
                      <td>
                        {{ item.id.name }}
                        {{ item.id.value }}
                      </td>
                      <td>
                        {{ item.picture.large }}
                        {{ item.picture.medium }}
                        {{ item.picture.thumbnail }}
                      </td>
                      <td>{{ item.nat }}</td>
                    </tr>
                  </tbody>
                </b-overlay>
              </table>
            </div>
          </b-card>
        </b-col>
      </div>
    </b-row>
    <!-- pagination -->
      <span></span>
       <!-- pagination -->
      <div class="pagination-wrapper mt-4">
        <span>Showing 5 from 30 entries</span>
        <b-pagination v-model="currentPage" :total-rows="rows" size="sm"></b-pagination>
      </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      sortBy: '',
      sortDesc: true,
      sortDirection: 'desc',
      currentPage: 10,
      resultsPerPage: 100,
      totalItems: 0,
      users: [],
      loading: false,
      search: {
        name: '',
        limit: 100
      }
    }
  },
  created () {
    this.fetchUsers()
  },
  mounted () {
    this.fetchUsers()
  },
  computed: {
    tableHeaders () {
      if (this.users.length > 0) {
        return Object.keys(this.users[0])
      }
      return []
    },
    totalPages () {
      return Math.ceil(this.totalItems / this.resultsPerPage)
    },
    paginatedUsers () {
      const startIndex = (this.currentPage - 1) * this.resultsPerPage
      const endIndex = startIndex + this.resultsPerPage
      return this.users.slice(startIndex, endIndex)
    }
  },
  methods: {
    fetchUsers () {
      this.loading = true
      const baseUrl = 'https://randomuser.me/api/'
      fetch(`${baseUrl}?page=${this.currentPage}&results=${this.resultsPerPage}`)
        .then(response => response.json())
        .then(data => {
          this.users = data.results
          this.totalItems = data.info.results
          this.loading = false
          console.log('users', this.users)
        })
        .catch(error => {
          console.error('Error fetching users:', error)
        })
    },
    handlePageChange (newPage) {
      this.currentPage = newPage
      this.fetchUsers()
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    previousPage () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    capitalizeFirstLetter (string) {
      return string.replace(/^\w/, match => match.toUpperCase())
    },
    sortedAsc () {
      return this.users.sort((a, b) => {
        if (a.id < b.id) return -1
        if (a.id > b.id) return 1
        return 0
      })
    }
  }
}
</script>
