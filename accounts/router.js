const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then( account => {
        res.status(200).json({ accounts: account})
    })
    .catch(err => {
        res.status(500).json({message: 'error'})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('accounts')
    .where({ id })
    .first()
    .then(post=> {
        if(post){
            res.status(200).json({data:post})
        }else{
            res.status(400).json({message:"Post not found"})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Account not found'})
     })
})

router.post('/', (req, res) => {
    const postData = req.body;
    db('accounts')
    .insert(postData, 'id')
    .then(newId => {
        const id = newId[0];
        db('accounts')
        .where({ id })
        .first()
        .then( newacc => {
            res.status(201).json(newacc)
        })
        .catch(err=>{
            res.status(500).json({message: "cannot create"})
    }) 
    })
})

router.patch('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params
    db('accounts')
    .where({id})
    .update(changes)
    .then(num => {
        if (num > 0) {
            res.status(200).json({message: 'updated'})
        } else {
            res.status(404).json({message: 'error'})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'error'})
    })
})

router.delete('/:id', (req,res) => {
    db('accounts')
    .where('id', req.params.id)
    .del()
    .then(deleted => {
    if (deleted) {
        res.status(200).json({message: 'deleted'})
    } else {
        res.status(404).json({message: 'error'})
    }
}) 
.catch(error => {
    res.status(500).json({error: 'error'})
})
})


module.exports = router;