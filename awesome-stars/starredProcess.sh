while read p; do
  description=`curl -s https://github.com/$p | egrep 'meta name="description"' | cut -c39- | rev | cut -c3- | rev`
  removeContributor=" Contribute to $p development by creating an account on GitHub."
  removeRepoName=" - $p"
  removedContributor=$(echo "$description" | sed "s@$removeContributor@@")
  formattedDescription=$(echo "$removedContributor" | sed "s@$removeRepoName@@")

  echo "- [$p](https://github.com/$p)"
  echo "  - $formattedDescription"
done <starredRepos.txt