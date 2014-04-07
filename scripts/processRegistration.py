import sqlite3
import urllib2
import ftplib
import smtplib
import os, re


# Global variables
participantsURL = "https://docs.google.com/spreadsheet/pub?key=0AldfGE7a-kvPdGZBVnE5dlRYT056YS1wbEI2bmpqYkE&output=csv"
generateCSV = False
databaseName    = "hpsp2014.db"
emailUsername   = "lessju"
emailPassword   = "Arcadia10"
ftpServer       = "ftp.hpsp2014.com"
ftpUsername     = "hpsp2014com"
ftpPassword     = "Arcadia10!"
formEntries = {
    'timestamp'   : 0,
    'title'       : 1,
    'forename'    : 2,
    'surname'     : 3,
    'email'       : 4,
    'affiliation' : 5,
    'position'    : 6,
    'city'        : 7,
    'postcode'    : 8,
    'country'     : 9,
    'telno'       : 10,
    'mobno'       : 11,
    'outreach'    : 12,
    'invletter'   : 13,
    'processed'   : 14,
}

def initialiseDatabase():
    """ Create participants table in database """

    # Check if database already exists
    if os.path.exists(databaseName):
        return

    # Create connection
    conn = sqlite3.connect(databaseName)

    # Create participants table
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE participants (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                          timestamp TEXT,
                                          title VARCHAR(5),
                                          forename TEXT,
                                          surname TEXT,
                                          email TEXT,
                                          affiliation TEXT,
                                          position TEXT,
                                          city TEXT,
                                          postcode TEXT,
                                          country TEXT,
                                          telno TEXT,
                                          mobno TEXT,
                                          outreach INTEGER,
                                          invletter INTEGER,
                                          processed INTEGER) ''')

    # Done
    conn.commit()
    conn.close()


def sendNewParticipantsEmail(data, newParticipants):
    """ Send out email with list of new participants """

    fromaddr = 'alessio.magro@hpsp2014.com'  
    toaddrs  = 'alessio.magro@hpsp2014.com'
#                ian.fenech.conti@hpsp2014.com,\
#                jackson.levi.said@hpsp2014.com'

    body = 'New users have registered for HPSP2014:\n' 
    for i in newParticipants:
        body += "\t%s %s from %s\n" % (data[i][formEntries['forename']],
                                     data[i][formEntries['surname']],
                                     data[i][formEntries['affiliation']])

    # Send the mail
    server = smtplib.SMTP('smtp.gmail.com:587')  
    server.starttls()  
    server.login(emailUsername ,emailPassword)  

    headers = ["from: " + fromaddr,
               "subject: New HPSP2014 Participants",
               "to: " + toaddrs,
               "mime-version: 1.0",
               "content-type: text/plain"]
    headers = "\r\n".join(headers)

    server.sendmail(fromaddr, toaddrs, headers + "\r\n\r\n" + body)  
    server.quit()  


def generateCSVFile(data):
    """ Generate CSV file for website """

    # Open file    
    f = open("participants.csv", "w")

    # Format file content
    content = '\n'.join(["##".join(line) for line in data])

    # Write and rewind file
    f.write(content)
    f.rewind()

    # Send file to FTP server
    session = ftplib.FTP(ftpServer, ftpUsername, ftpPassword)
    session.storlines('STOR participants.txt', f)
    session.quit()

    # Done, close file
    f.close()

def updateRegistrants(data):
    """ Update registrants data in database """

    # Create connection
    conn = sqlite3.connect(databaseName)
    c    = conn.cursor()

    newParticipants = []    

    # Check each participant exists
    for i, item in enumerate(data):
        c.execute("SELECT surname from participants WHERE email='%s'" 
                   % item[formEntries['email']])

        # Does not exist, create new entry
        if c.fetchone() == None:

            outreach  = 1 if item[formEntries['outreach']] == 'Yes' else 0
            invletter = 1 if item[formEntries['invletter']] == 'Yes' else 0

            c.execute("""INSERT INTO participants VALUES(NULL,'%s','%s','%s',
                                                         '%s','%s','%s','%s',
                                                         '%s','%s','%s','%s',
                                                         '%s',%d,%d,%d)""" % 
                     (item[formEntries['timestamp']], item[formEntries['title']], 
                      item[formEntries['forename']],  item[formEntries['surname']],
                      item[formEntries['email']],     item[formEntries['affiliation']],
                      item[formEntries['position']],  item[formEntries['city']], 
                      item[formEntries['postcode']],  item[formEntries['country']],
                      item[formEntries['telno']],     item[formEntries['mobno']],
                      outreach, invletter, 0) )

            # Add new participant to list
            newParticipants.append(i)            

    # Commit changes
    conn.commit()
    conn.close()

    # Send out emails if there are new participants
    if len(newParticipants) > 0:
        sendNewParticipantsEmail(data, newParticipants)

    # Generate CSV file and send to FTP server
    if generateCSV:
        generateCSVFile(data)

def processRegistration():
    """ Process registration list """

    # Get data from Google spreadsheet
    data = urllib2.urlopen(participantsURL).read()

    # Handle delimeter conflits, find all instances of inverted commas
    # and replace all commas within to a different character
    indices = [i for i, l in enumerate(data) if l == '"']

    if len(indices) % 2 is not 0:
        print "Something's not right"
        return

    # Pair inverted commas together
    indices = [(indices[x], indices[x+1]) for x in xrange(0, len(indices), 2)]

    # Replace all commas within ranges to a different character
    for start, stop in indices:
        data = data[:start] + data[start:stop].replace(",","|") + data[stop:]

    # Split each item and remove first entry
    data = data.split('\n')[1:]

    # Split each field and change back delimeters
    processed = [item.split(',') for item in data]
    for i, item in enumerate(processed):
        for j, entry in enumerate(item):
            processed[i][j] = entry.replace("|",",").replace('"',"")

    # All done, update database (if required)
    updateRegistrants(processed)


if __name__ == "__main__":

    # Initialise data (for first time use)
    initialiseDatabase()

    # Loop forever
    while(True):
        
        # Wait for some time before doing this
        sleep(60)

    processRegistration()

        
        
