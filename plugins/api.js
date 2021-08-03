import ApiService from '@/plugins/ApiService';

export default (ctx, inject) => {
  const api = new ApiService({
    $axios: ctx.app.$axios,
  })
  ctx.$api = api
  inject('api', api)
}
