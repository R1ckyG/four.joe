import sys, pymongo
DBNAME = 'four_joe'

def add_data(data, type):
  db = pymongo.Connection()[DBNAME]
  collection = db[type]
  collection.insert(data)

def add_schools(filename):
  f = open(filename, 'r')
  lines = [{'college':line.strip()} for line in f]
  add_data(lines, 'schools')

if __name__ == '__main__':
  if sys.argv[1] == 's':
    add_schools(sys.argv[2])

