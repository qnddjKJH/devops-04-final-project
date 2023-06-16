const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];


  export default function handler(req, res) {
    if (req.method === 'GET') {
      const userId = req.query.id;
      const filteredUsers = users.filter(user => user.id === Number(userId));

      res.status(200).json(filteredUsers);
    }

  }