const express = require('express')
const app = express()

// const {open} = require('sqlite')
// const sqlite3 = require('sqlite3')
// const path = require('path')

// const dbpath = path.join(__dirname, 'todoApplication.db')

app.use(express.json())

// let db = null

// const createtable = async () => {
//   try {
//     const query = `
//     CREATE TABLE 
//       todo(
//         id INTEGER,
//         todo TEXT,
//         priority TEXT,
//         status TEXT
//       );
//     `
//     await db.run(query)
//     console.log('table created')
//   } catch (error) {
//     console.log('table not created')
//   }
// }


// const createdb = async () => {
//   try {
//     db = await open({
//       filename: dbpath,
//       driver: sqlite3.Database,
//     })
//     app.listen(3000, () => console.log('server started'))
//     await createtable()
//   } catch (error) {
//     console.log(`db error ${error}`)
//   }
// }

// createdb()

function haspriority(obj) {
  return obj.priority !== undefined
}

function haspriorityandstatus(obj) {
  return obj.priority !== undefined && obj.status !== undefined
}

function hasstatus(obj) {
  return obj.status !== undefined
}

app.get('/todos/', async (request, response) => {
  // const {search_q = '', priority, status} = request.query
  // let query = ''
  switch (true) {
    case haspriorityandstatus(request.body):
      // query = `
      // SELECT 
      //   *
      // FROM 
      //   todo
      // WHERE
      //   todo LIKE '%${search_q}%'
      //   AND
      //   status='${status}'
      //   AND
      //   priority='${priority}';
      // `
      break
    case haspriority(request.body):
      // query = `
      // SELECT 
      //   *
      // FROM 
      //   todo
      // WHERE
      //   todo LIKE '%${search_q}%'
      //   AND
      //   priority='${priority}';
      // `
      break
    case hasstatus(request.body):
      // query = `
      // SELECT 
      //   * 
      // FROM
      //   todo
      // WHERE
      //   todo LIKE '%${search_q}%'
      //   AND
      //   status='${status}';
      // `
      break
    default:
      // query = `
      // SELECT 
      //   *
      // FROM 
      //   todo
      // WHERE
      //   todo LIKE '%${search_q}%';
      // `
  }
  const data = await db.all(query)
  response.send(data)
})

app.get('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  // const query = `
  // SELECT 
  //   *
  // FROM
  //   todo
  // WHERE
  //   id=${todoId};`
  const data = await db.get(query)
  response.send(data)
})

app.post('/todos/', async (request, response) => {
  const {id, todo, priority, status} = request.body
  // const query = `
  //   INSERT INTO 
  //     todo(id,todo,priority,status)
  //   VALUES (${id},'${todo}','${priority}','${status}');`
  await db.run(query)
  response.send('Todo Successfully Added')
})

app.put('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const ele = request.body
  let p = null
  switch (true) {
    case ele.status !== undefined:
      p = 'Status'
      break
    case ele.priority !== undefined:
      p = 'Priority'
      break
    case ele.todo !== undefined:
      p = 'Todo'
      break
  }
  // const query = `
  //   SELECT 
  //     * 
  //   FROM
  //     todo
  //   WHERE
  //     id=${todoId};`
  const data = await db.get(query)
  const {
    id = data.id,
    todo = data.todo,
    priority = data.priority,
    status = data.status,
  } = request.body
  // const code = `
  // UPDATE 
  //   todo
  // SET 
  //   todo='${todo}',priority='${priority}',status='${status}'
  // WHERE
  //   id=${id};`
  await db.run(code)
  response.send(`${p} Updated`)
})

app.delete('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  // const code = `
  //     DELETE FROM 
  //       todo
  //     WHERE
  //       id=${todoId};`
  await db.run(code)
  response.send('Todo Deleted')
})

module.exports = app
