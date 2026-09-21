const pool = require('./db');

class User {
    static async getAll() {
        const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
        return result.rows;
    }

    static async create(userData) {
        const { name, email, phone, role = 'user', isActive = true } = userData;
        const status = isActive ? 'active' : 'inactive';
        
        const query = `
            INSERT INTO users (name, email, phone, role, status, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
            RETURNING *
        `;
        const values = [name, email, phone, role, status];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }
    
    static async checkExistsByName(name) {
        const query = 'SELECT * FROM users WHERE LOWER(TRIM(name)) = LOWER(TRIM($1))';
        const result = await pool.query(query, [name]);
        return result.rows.length > 0;
    }
}

module.exports = User;