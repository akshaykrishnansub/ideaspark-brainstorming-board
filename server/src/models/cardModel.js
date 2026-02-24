import db from '../config/db.js'

const findCardsByCategoryId=async(category_id)=>{
    const result=await db.query('SELECT * from cards where category_id=$1 ORDER BY position',[category_id]);
    return result.rows
}

const insertCard=async(board_id,category_id,content,position)=>{
    const result=await db.query('INSERT into cards (board_id,category_id,content,position) VALUES($1,$2,$3,$4) returning *',[board_id,category_id,content,position]);
    return result.rows[0];
}

const calculateMaxPositionByCategory=async(category_id)=>{
    const result=await db.query('SELECT COALESCE(MAX(position),0) as max from cards where category_id=$1',[category_id]);
    return result.rows[0].max;
}

//find card by ID
const findCardById=async(card_id)=>{
    const result=await db.query('select * from cards WHERE id=$1',[card_id]);
    return result.rows[0];
}

//delete single card
const deleteCardById=async(card_id)=>{
    const result=await db.query('DELETE from cards where id=$1 returning *',[card_id])
    return result.rows[0]
}

//delete cards by category
const deleteCardsByCategoryId=async(category_id)=>{
    const result=await db.query('DELETE from cards where category_id=$1 returning *',[category_id]);
    return result.rows
}

//delete cards by board
const deleteCardsByBoardId=async(board_id)=>{
    const result=await db.query('DELETE from cards where board_id=$1 returning *',[board_id]);
    return result.rows
}

//Update card by ID
const updateCardById=async(card_id,content)=>{
    const result=await db.query('UPDATE cards SET content=$1,updatedAt=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *',[content,card_id]);
    return result.rows[0];
}

const updateCardPositions=async(cards)=>{
    let cardsToUpdate=[];
    for(const card of cards){
        const result=await db.query('UPDATE cards SET category_id=$1,position=$2,updatedAt=CURRENT_TIMESTAMP WHERE id=$3 RETURNING *',[card.category_id,card.position,card.id]);
        cardsToUpdate.push(result.rows[0])
    }
    return cardsToUpdate;
}

export {insertCard,calculateMaxPositionByCategory,findCardsByCategoryId,findCardById,deleteCardById,deleteCardsByBoardId,deleteCardsByCategoryId,updateCardById,updateCardPositions}