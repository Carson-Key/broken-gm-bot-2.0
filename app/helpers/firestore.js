// Packages
const { doc, getDoc, setDoc, deleteDoc } = require("firebase/firestore"); 
// Firebase
const { db } = require('./firebase');

async function getDocument(collection, document, returnErrorCode = false) {
	try {
		const userDoc = doc(db, collection, document)
		const userDBEntry = await getDoc(userDoc)
	
		if (userDBEntry.exists()) {
			return userDBEntry
		} else {
			return null
		}
	} catch (error) {
		if (returnErrorCode) {
			return error.code
		} else {
			// fireBaseError(setNotification, error.code, error.message)
			return null
		}
	}
}
async function setDocument(collection, document, dataToAdd, documentExsists = true) {
	try {
		const userDoc = doc(db, collection, document)

		if (documentExsists) {
			await setDoc(userDoc, dataToAdd)
		}
	} catch (error) {
		// fireBaseError(setNotification, error.code, error.message)
	}
}
async function updateDocument(collection, document, dataToAdd, documentExsists = true) {
	try {
		const userDoc = doc(db, collection, document)

		if (documentExsists) {
			await setDoc(userDoc, dataToAdd, { merge: true })
		}
	} catch (error) {
		// fireBaseError(setNotification, error.code, error.message)
	}
}
async function updateDocumentWithPromise(collection, document, dataToAdd, documentExsists = true) {
	try {
		const userDoc = doc(db, collection, document)

		if (documentExsists) {
			return setDoc(userDoc, dataToAdd, { merge: true })
		}
	} catch (error) {
		return {
			then: () => {
				// fireBaseError(setNotification, error.code, error.message)
			}
		}
	}
}
async function deleteDocument(collection, document, documentExsists = true) {
	try {
		const userDoc = doc(db, collection, document)

		if (documentExsists) {
			await deleteDoc(userDoc)
		}
	} catch (error) {
		// fireBaseError(setNotification, error.code, error.message)
	}
}
async function deleteDocumentWithPromise(collection, document, documentExsists = true) {
	try {
		const userDoc = doc(db, collection, document)

		if (documentExsists) {
			return deleteDoc(userDoc)
		}
	} catch (error) {
		return {
			then: () => {
				// fireBaseError(setNotification, error.code, error.message)
			}
		}
	}
}

module.exports.getDocument = getDocument
module.exports.setDocument = setDocument
module.exports.updateDocument = updateDocument
module.exports.updateDocumentWithPromise = updateDocumentWithPromise
module.exports.deleteDocument = deleteDocument
module.exports.deleteDocumentWithPromise = deleteDocumentWithPromise