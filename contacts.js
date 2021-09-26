const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

const readContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(result);
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const result = contacts.filter((contact) => contact.id === contactId);
    return result;
  } catch (error) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    if (contacts.length === 0) {
      return contacts;
    }
    const result = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
