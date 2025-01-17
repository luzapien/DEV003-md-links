# Markdown Links

md-links-lurza is a library that allows extracting the links found in a Markdown file (.md). Showing in turn some properties of the links: The file path, URL, status, status code (with this property we will know if the link is broken), the text of the link and whether it has been validated.
***

## 1.Introduction

[Markdown](https://www.ibm.com/docs/en/SSYKAV?topic=train-how-do-use-markdown) is an easy-to-use markup language that is used with plain text to add formatting elements (headings, bulleted lists, URLs) to plain text without the use of a formal text editor or the use of HTML tags. Markdown is device agnostic and displays the writing format consistently across device types.



## 2.Usage instructions

1) Installing package  

`npm install md-links-lurza`  

2) CLI (Command Line Interface)

The executable of our application must be able to run as follows
way through the **terminal**:

`md-links <path-to-file> [options]`

For example:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options  

### `--h`or `--help`  

Help menu  

##### `--validate`

If we pass the `--validate` option, the module should make an HTTP request to
find out if the link works or not. If the link results in a redirect to a
URL that responds ok, then we will consider the link as ok.

For example:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

If we pass the `--stats` option the output will be a text with statistics
Basics about links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```


We can also combine `--stats` and `--validate` to get statistics that
need the validation results.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
