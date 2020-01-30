function compress(array) {
    let previous = ''
    const compressedArray = []

    for (let i = 0; i < array.length; i += 1) {
        current = array[i]
        const previousChars = previous.split('')
        const currentChars = current.split('')
        let suffix = currentChars
        let sharedChars = 0

        while (currentChars[sharedChars] === previousChars[sharedChars]) {
            sharedChars += 1
        }
        
        if (sharedChars > 0) {
            suffix = currentChars.splice(sharedChars)
        }

        compressedArray.push(`${sharedChars} ${suffix.join('')}`)
        previous = current
    }

    return compressedArray
}

function deCompress(array) {
    let previous = ''
    const deCompressedArray = []

    for (let i = 0; i < array.length; i += 1) {
        let deCompressedWord = ''

        const current = array[i]
        const amountSharedChars = parseInt(current.substr(0, 2))
        const suffix = current.slice(2)
        if (amountSharedChars === 0) {
            deCompressedWord = suffix
        } else {
            const prefix = previous.substr(0, amountSharedChars)
            deCompressedWord = `${prefix}${suffix}`
        }

        deCompressedArray.push(deCompressedWord)
        previous = deCompressedWord
    }

    return deCompressedArray
}

module.exports = { compress, deCompress }
