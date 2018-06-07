const DB = require('../utils/db.js')

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let product = ctx.request.body
    let list = await DB.query('SELECT * FROM trolley_user WHERE trolley_user.id = ? AND trolley_user.user = ?',[product.id,user])
    if(!list.length){
      //商品还未添加过购物车
      await DB.query('INSERT INTO trolley_user(id,count,user) VALUES (?,?,?)', [product.id,1,user])
    }else{
      //商品之前已经添加过购物车
      let count = list[0].count + 1
      await DB.query('UPDATE trolley_user SET count = ? WHERE trolley_user.id = ? AND trolley_user.user = ?', [count, product.id,user])
    }
    ctx.state.data = {}
  },
  list: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    ctx.state.data = await DB.query('SELECT * FROM trolley_user LEFT JOIN product ON trolley_user.id = product.id WHERE trolley_user.user = ?',[user])
  },
  update: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let productList = ctx.request.body.list || []
    await DB.query('DELETE FROM trolley_user WHERE trolley_user.user = ?',[user])
    let sql = 'INSERT INTO trolley_user(id,count,user) VALUES '
    let query = []
    let param = []
    productList.forEach(product => {
      query.push('(?,?,?)')
      param.push(product.id)
      param.push(product.count || 1)
      param.push(user)
    })
    await DB.query(sql + query.join(', '), param)
  }
}