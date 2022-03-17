# To be run from main folder.

import os
import re

# TODO: It'd be good to change the folder (A) just for link readability (?) 
# Images miiiight break though. Will try later.
indexFolder = os.path.abspath("./wiki")
pagesFolder = indexFolder + "/A"
indexFile = open(indexFolder + "/index.html", "w")
indexHtml = ""

for fileName in os.listdir(pagesFolder):
  pageTitle = fileName
  # HTML change needed for pages to be served as html.
  source = pagesFolder + "/" + fileName
  htmlFile = pagesFolder + "/" + fileName + ".html"
  os.rename(source, htmlFile)

  with open (htmlFile, 'r+') as html:
    content = html.read()
    # Generally, href="Page" title="Page" is the shape of the link, but there are exeptions to deal with.
    # TODO: Something needs to be done for content="0;url=Afrika" pages (redirect)
    newContentWithCorrectLinks = re.sub(r'"(?=(\s| |\x20|&nbsp;)title=")', '.html"', content, flags = re.M)
    html.write(newContentWithCorrectLinks)

  # TODO: When using swarm, this line should be used instead of the next one.
  indexHtml += "<a href=\"/A/" + pageTitle + ".html\"" + ">" + pageTitle + "</a><br/>"
  # This line is for testing
  # indexHtml += "<a href=" + htmlFile + ">" + pageTitle + "</a><br/>"

indexFile.write("<!DOCTYPE html>")
indexFile.write('<html>')
indexFile.write(indexHtml)
indexFile.write("</html")
indexFile.close()

errorFile = open(indexFolder + "/error.html", "w")
errorFile.write("<!DOCTYPE html><html><p>An error ocurred</p></html>")
errorFile.close()