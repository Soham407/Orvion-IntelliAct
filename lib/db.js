import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const MOCK_FILE_PATH = path.join(process.cwd(), "lib/db-mock.json");

// Helper to determine if MySQL env vars are present
export const isMysqlConfigured = () => {
  return !!(
    process.env.DB_HOST &&
    process.env.DB_USER &&
    process.env.DB_PASSWORD &&
    process.env.DB_NAME
  );
};

// Create connection pool if configured
let pool = null;
if (isMysqlConfigured()) {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

// Initial mock data to seed if mock JSON doesn't exist
const initialMockDocuments = [
  {
    id: 1,
    title: "Company Policy Manual",
    description: "Comprehensive guidelines covering company policies, code of conduct, and employee expectations.",
    category: "policy",
    file_name: "company_policy_manual.pdf",
    file_type: "PDF",
    file_size: "2.4 MB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Company Policy Manual content]").toString("base64"),
    uploaded_at: "2026-01-15T10:30:00.000Z"
  },
  {
    id: 2,
    title: "HSE Policy",
    description: "Health, Safety, and Environment policy document outlining safety standards and procedures.",
    category: "safety",
    file_name: "hse_policy.pdf",
    file_type: "PDF",
    file_size: "1.8 MB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock HSE Policy content]").toString("base64"),
    uploaded_at: "2026-03-10T14:15:00.000Z"
  },
  {
    id: 3,
    title: "Quality Policy",
    description: "Quality management standards, ISO compliance requirements, and quality assurance procedures.",
    category: "quality",
    file_name: "quality_policy.pdf",
    file_type: "PDF",
    file_size: "1.2 MB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Quality Policy content]").toString("base64"),
    uploaded_at: "2026-02-22T09:00:00.000Z"
  },
  {
    id: 4,
    title: "Employee Handbook",
    description: "Complete handbook covering leave policies, benefits, grievance procedures, and workplace guidelines.",
    category: "hr",
    file_name: "employee_handbook.pdf",
    file_type: "PDF",
    file_size: "3.1 MB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Employee Handbook content]").toString("base64"),
    uploaded_at: "2026-04-05T11:45:00.000Z"
  },
  {
    id: 5,
    title: "IT & Data Security Policy",
    description: "Information security guidelines, acceptable use policy, and data protection standards.",
    category: "policy",
    file_name: "it_data_security_policy.pdf",
    file_type: "PDF",
    file_size: "980 KB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock IT & Data Security Policy content]").toString("base64"),
    uploaded_at: "2026-05-18T16:20:00.000Z"
  },
  {
    id: 6,
    title: "Travel & Expense Policy",
    description: "Guidelines for business travel, expense claims, and reimbursement procedures.",
    category: "hr",
    file_name: "travel_expense_policy.pdf",
    file_type: "PDF",
    file_size: "650 KB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Travel & Expense Policy content]").toString("base64"),
    uploaded_at: "2026-01-20T08:15:00.000Z"
  },
  {
    id: 7,
    title: "Emergency Response Plan",
    description: "Emergency procedures, evacuation plans, and crisis management protocols.",
    category: "safety",
    file_name: "emergency_response_plan.pdf",
    file_type: "PDF",
    file_size: "1.5 MB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Emergency Response Plan content]").toString("base64"),
    uploaded_at: "2026-03-28T13:00:00.000Z"
  },
  {
    id: 8,
    title: "Anti-Bribery & Ethics Policy",
    description: "Code of ethics, anti-corruption guidelines, and compliance requirements.",
    category: "policy",
    file_name: "anti_bribery_ethics_policy.pdf",
    file_type: "PDF",
    file_size: "720 KB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Anti-Bribery & Ethics Policy content]").toString("base64"),
    uploaded_at: "2026-02-04T10:00:00.000Z"
  },
  {
    id: 9,
    title: "Project Execution Standards",
    description: "Standard operating procedures for project execution, documentation, and handover.",
    category: "quality",
    file_name: "project_execution_standards.pdf",
    file_type: "PDF",
    file_size: "2.8 MB",
    file_data: Buffer.from("%PDF-1.4 ... [Mock Project Execution Standards content]").toString("base64"),
    uploaded_at: "2026-04-12T15:30:00.000Z"
  },
  {
    id: 10,
    title: "Company Organizational Chart",
    description: "Current organizational structure, reporting hierarchy, and department contacts.",
    category: "general",
    file_name: "organizational_chart.png",
    file_type: "PNG",
    file_size: "450 KB",
    file_data: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg== [Mock PNG Data]").toString("base64"),
    uploaded_at: "2026-05-02T11:00:00.000Z"
  }
];

// Initialize DB schema / files
export async function initDatabase() {
  if (isMysqlConfigured()) {
    try {
      const connection = await pool.getConnection();
      await connection.query(`
        CREATE TABLE IF NOT EXISTS documents (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          category VARCHAR(50) NOT NULL,
          file_name VARCHAR(255) NOT NULL,
          file_type VARCHAR(50) NOT NULL,
          file_size VARCHAR(50) NOT NULL,
          file_data LONGBLOB NOT NULL,
          uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);

      // Seed if empty
      const [rows] = await connection.query("SELECT COUNT(*) as count FROM documents");
      if (rows[0].count === 0) {
        console.log("Seeding MySQL database with initial documents...");
        let docsToSeed = initialMockDocuments;
        try {
          if (fs.existsSync(MOCK_FILE_PATH)) {
            const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
            docsToSeed = JSON.parse(raw);
          }
        } catch (e) {
          console.error("Failed to read MOCK_FILE_PATH for seeding:", e);
        }
        for (const doc of docsToSeed) {
          const fileBuffer = Buffer.from(doc.file_data, "base64");
          await connection.query(
            "INSERT INTO documents (title, description, category, file_name, file_type, file_size, file_data, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [doc.title, doc.description, doc.category, doc.file_name, doc.file_type, doc.file_size, fileBuffer, new Date(doc.uploaded_at)]
          );
        }
      }
      connection.release();
      console.log("MySQL database initialized and verified.");
    } catch (error) {
      console.error("MySQL DB Initialization Error:", error);
    }
  } else {
    // Local JSON mock
    if (!fs.existsSync(MOCK_FILE_PATH)) {
      // Ensure folder exists
      fs.mkdirSync(path.dirname(MOCK_FILE_PATH), { recursive: true });
      fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(initialMockDocuments, null, 2), "utf8");
      console.log("Mock database file initialized.");
    }
  }
}

// Get all documents metadata (exclude BLOB file data for speed)
export async function getDocuments() {
  await initDatabase();

  if (isMysqlConfigured()) {
    try {
      const [rows] = await pool.query(
        "SELECT id, title, description, category, file_name, file_type, file_size, uploaded_at FROM documents ORDER BY id DESC"
      );
      return rows;
    } catch (error) {
      console.error("Failed to query documents from MySQL:", error);
      throw error;
    }
  } else {
    // Read from mock JSON
    try {
      if (fs.existsSync(MOCK_FILE_PATH)) {
        const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
        const list = JSON.parse(raw);
        // Exclude file_data from list representation
        return list.map(({ file_data, ...rest }) => rest).sort((a, b) => b.id - a.id);
      }
      return [];
    } catch (error) {
      console.error("Failed to read mock database file:", error);
      return [];
    }
  }
}

// Get single document by ID including binary file_data
export async function getDocumentById(id) {
  await initDatabase();

  if (isMysqlConfigured()) {
    try {
      const [rows] = await pool.query("SELECT * FROM documents WHERE id = ?", [id]);
      if (rows.length === 0) return null;
      return {
        ...rows[0],
        file_data: rows[0].file_data // Buffer in node mysql2
      };
    } catch (error) {
      console.error(`Failed to query document ${id} from MySQL:`, error);
      throw error;
    }
  } else {
    try {
      if (fs.existsSync(MOCK_FILE_PATH)) {
        const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
        const list = JSON.parse(raw);
        const item = list.find((d) => d.id === parseInt(id));
        if (!item) return null;
        return {
          ...item,
          file_data: Buffer.from(item.file_data, "base64")
        };
      }
      return null;
    } catch (error) {
      console.error("Failed to read mock database for item:", error);
      return null;
    }
  }
}

// Upload a new document
export async function uploadDocument({ title, description, category, file_name, file_type, file_size, file_buffer }) {
  await initDatabase();

  if (isMysqlConfigured()) {
    try {
      const [result] = await pool.query(
        "INSERT INTO documents (title, description, category, file_name, file_type, file_size, file_data) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, description, category, file_name, file_type, file_size, file_buffer]
      );
      return { id: result.insertId, title, description, category, file_name, file_type, file_size };
    } catch (error) {
      console.error("Failed to insert document into MySQL:", error);
      throw error;
    }
  } else {
    try {
      const raw = fs.existsSync(MOCK_FILE_PATH) ? fs.readFileSync(MOCK_FILE_PATH, "utf8") : "[]";
      const list = JSON.parse(raw);
      
      const newId = list.length > 0 ? Math.max(...list.map(d => d.id)) + 1 : 1;
      const newDoc = {
        id: newId,
        title,
        description,
        category,
        file_name,
        file_type,
        file_size,
        file_data: file_buffer.toString("base64"),
        uploaded_at: new Date().toISOString()
      };

      list.push(newDoc);
      fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(list, null, 2), "utf8");
      
      const { file_data, ...metadata } = newDoc;
      return metadata;
    } catch (error) {
      console.error("Failed to save document to mock JSON:", error);
      throw error;
    }
  }
}

// Delete a document
export async function deleteDocument(id) {
  await initDatabase();

  if (isMysqlConfigured()) {
    try {
      const [result] = await pool.query("DELETE FROM documents WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Failed to delete document ${id} from MySQL:`, error);
      throw error;
    }
  } else {
    try {
      if (fs.existsSync(MOCK_FILE_PATH)) {
        const raw = fs.readFileSync(MOCK_FILE_PATH, "utf8");
        let list = JSON.parse(raw);
        const originalLength = list.length;
        list = list.filter((d) => d.id !== parseInt(id));
        fs.writeFileSync(MOCK_FILE_PATH, JSON.stringify(list, null, 2), "utf8");
        return list.length < originalLength;
      }
      return false;
    } catch (error) {
      console.error("Failed to delete from mock database:", error);
      return false;
    }
  }
}
