const express = require('express');
const monggose = require('mongoose');

const productSchema = new monggose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number,
    },
    productPictures: [
        {
            img: {
                type: String
            }
        }
    ],
    reviews: [
        {
            userId: { type: monggose.Schema.Types.ObjectId, ref: 'User' },
            review: String
        }
    ],
    category: {
        type: monggose.Schema.Types.ObjectId, ref: 'Category',
        required: true,
    },
    createdBy: {
        type: monggose.Schema.Types.ObjectId, ref: 'User',
        required: true,
    },

    updateAt: Date

}, { timestamps: true })

module.exports = monggose.model('Product', productSchema);