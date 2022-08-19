<template>
  <CardContainer title="Trending" link="#">
    <div
      class="mt-3 d-flex align-items-center slider gap-3"
      v-if="trending && trending.length > 0"
    >
      <div class="card" v-for="trend in trending" :key="trend.item.id">
        <div class="img-thumb d-flex justify-content-center">
          <img :src="trend.item.large" :alt="trend.item.id" loading="lazy" />
        </div>
        <div class="text-section">
          <h5 class="mb-0">{{ trend.item.name }}</h5>
          <p class="text-muted text-small text-uppercase mb-0">
            {{ trend.item.symbol }}
          </p>
          <p class="text-small m-0">
            <span>
              <span>MKT Rank: </span>
              <span class="fw-bold">{{ trend.item.market_cap_rank }}</span>
            </span>
            <span class="ms-2">
              <span>Score: </span>
              <span class="fw-bold">{{ trend.item.score }}</span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="px-3" v-else>
      <p class="text-muted">No trending coins found</p>
    </div>
  </CardContainer>
</template>

<script>
export default {
  data() {
    return {
      trending: [],
    }
  },
  methods: {
    async getTrends() {
      try {
        let req = await this.$axios.get(
          'https://api.coingecko.com/api/v3/search/trending'
        )
        this.trending = req.data.coins
      } catch (error) {
        this.$Notice.open({ title: error, type: 'error' })
      }
    },
  },
  mounted() {
    this.getTrends();
    setInterval(() => {
      this.getTrends();
      console.log("trends updated");
    }, 1000000);
  },
}
</script>

<style scoped>
.card {
  min-width: 300px;
  background-color: var(--dark);
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  flex-shrink: 0;
}

.img-thumb {
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  background: var(--bs-gray-800);
}
.img-thumb img {
  width: 65px;
  height: 65px;
  margin: auto;
  border-radius: 50%;
}
.slider {
  overflow: hidden;
  overflow-x: auto;
  flex: auto;
  white-space: nowrap;
  padding-bottom: 1rem;
}
</style>
