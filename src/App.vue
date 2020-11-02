<template>
  <div>
    <div class="container">
      <div class="head">
        <img src="./assets/logo.png" alt="" class="logo" />
        <h1>GK Quiz</h1>
        <h4>Inter House</h4>
        <!-- <h5 class="blue">11th November, 2020</h5> -->
      </div>

      <div class="info flex-center">
        <div class="ten columns">
          <p class="center">
            The Inter House GK Quiz will be held on
            <span class="med">11th November, 2020</span>
            <span>.</span>
            Fill out the form below if you are interested in participating. This
            form is for the students of
            <a href="http://themis.in" target="_blank">
              The Mother's International School
            </a>
            only.
          </p>
        </div>
      </div>

      <div v-if="submitted && !closed" class="succ center">
        <h3 class="center" v-if="msg == 'success'">
          Your application was sent successfully :)
        </h3>
        <h5>Prelims will be held here on 3rd November, 2020</h5>
      </div>

      <div v-if="closed" class="succ center">
        <h3 class="center">
          Applications have now been closed.
        </h3>
        <h5>Prelims will be held here on 3rd November, 2020</h5>
      </div>

      <form v-if="!submitted && !closed" @submit="addUser">
        <div class="row">
          <div class="one-third column">
            <h6 class="subtext">Name</h6>
            <input v-model="name" type="text" placeholder="Name" required />
          </div>
          <div class="one-third column">
            <h6 class="subtext">Email</h6>
            <input v-model="email" type="Email" placeholder="Email" required />
          </div>
          <div class="one-third column">
            <h6 class="subtext">Phone Number</h6>
            <input v-model="phone" type="number" placeholder="Phone" required />
          </div>
        </div>

        <div class="row">
          <div class="six columns">
            <h6 class="subtext">Select Class</h6>
            <select v-model="class1" required>
              <option value="0" disabled>Class</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </div>

          <div class="six columns">
            <h6 class="subtext">Select Section</h6>
            <select v-model="section" required>
              <option value="0" disabled>Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </div>
          <div class="twelve columns">
            <h6 class="subtext">Select House</h6>
            <select v-model="house" required>
              <option value="0" disabled>Select House</option>
              <option value="Sincerity">Sincerity</option>
              <option value="Honesty">Honesty</option>
              <option value="Aspiration">Aspiration</option>
              <option value="Truth">Truth</option>
              <option value="Perfection">Perfection</option>
              <option value="Gratitude">Gratitude</option>
            </select>
          </div>
        </div>

        <div class="u-cf"></div>

        <div class="flex-center">
          <h6 v-if="classerror" class="med red">
            {{ classerror }}
          </h6>
          <h6 v-if="houseerror" class="med red" style="margin-bottom: 0.5em;">
            {{ houseerror }}
          </h6>

          <button class="cool" :disabled="disable">
            <span v-if="!loading">Submit</span>
            <span v-if="loading">Loading</span>
          </button>
        </div>
      </form>
    </div>
    <footer class="footer">
      <div class="center">
        <h6>
          Made with 💙 by
          <a href="//arhaanb.co" target="_blank">Arhaan Bahadur</a>
        </h6>
        <h6>
          Hosted by:
          <a href="//minet.co" target="_blank">Siddhayak Goyal</a>
          & Achal Gupta
        </h6>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    name: '',
    email: '',
    phone: '',
    class1: 0,
    section: 0,
    house: 0,
    closed: false,
    disable: false,
    loading: false,
    submitted: false,
    msg: '',
    classerror: '',
    houseerror: '',
  }),
  methods: {
    async addUser(e) {
      e.preventDefault()
      this.disable = true
      this.loading = true
      if (this.class1 == 0 || this.section == 0 || this.house == 0) {
        this.classerror = ''
        this.houseerror = ''
        if (this.class1 == 0 || this.section == 0) {
          this.classerror = 'Please choose your class.'
          this.disable = false
          this.loading = false
        }

        if (this.house == 0) {
          this.houseerror = 'Please choose your house.'
          this.disable = false
          this.loading = false
        }
      } else {
        await axios
          .post('https://mismunapi.herokuapp.com/gkquiz', {
            name: this.name,
            email: this.email,
            phone: this.phone,
            class: this.class1,
            section: this.section,
            house: this.house,
          })
          .then((response) => {
            const data = response.data
            // console.log(data);
            this.msg = data.msg
          })
        this.loading = false
        this.submitted = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  padding-top: 4em;
  h1 {
    font-size: 5em;
  }
}

.logo {
  width: 8em;
}

footer.footer {
  margin-top: 3em;
  padding: 0.7em 0;
  background-color: rgba(228, 228, 228, 0.664);
  border-top: solid 1px rgba(34, 34, 34, 0.2);
}
</style>
