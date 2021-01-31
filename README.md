# Quotebook

## Sources

The kubernetes config files can be found under the k8s folder, with the filenames refering to one of the three services.
The actual application source code can be found in either the rest-api folder or the webapp folder, depending on which application you want to inspect.

## Building

The Quotebook app makes use of three images, of which two are custom.

### Building the REST API

Navigate to the rest-api folder, and enter `docker build .` to build the image. Keep in mind this will not
update the image running in the kubernetes cluster, as they pull an image uploaded to docker hub.

### Building the WebApp

Navigate to the webapp/first-react folder, and enter `docker build .` to build the image. Keep in mind this will not
update the image running in the kubernetes cluster, as they pull an image uploaded to docker hub.

## Application Management

## Deploying the application

Deploying the application can be done in one of two ways:

1. Deploying the helm package located at helm/quotebook-1.0.0.tgz
2. Deploying all the YAML files in the k8s folder

The first method is faster to install and uninstall, while the second method allows
for more customisability.

The Helm chart also allows some basic configuration in the amount of replicas of the webapp and rest-api, if one desires.
The default is set to one of each, but if you create a custom yaml file and pass that along as a parameter to `helm3 install -f {custom_config_yaml}` then
you can influence the amount of replicas by setting the "replicaCountApi" and "replicaCountWebApp" keys to a custom value.

### The ingress

The running of this application requires running an ingress.
Furthermore, it requires the use of the hostnames
`api.quotebook.io` and `www.quotebook.io`.

In order for the application to work properly, these two domains have to be added to the /etc/hosts file and redirected to the cluster. If port forwarding to a VM, keep in mind that
both HTTP and HTTPS have to be port forwarded (port 80 and 443).


## Upgrading the application

To upgrade the application with a rolling deployment, simply update the deployment YAML script for the deployment you wish to update with the new container image, then apply it. To upgrade the application with a canary deployment, you must define a new YAML with the same details as the old deployment, but with a different label and image. Scale the old and new deployments according to the ratio you desire, then apply the new deployment. Incoming requests will be routed to the new deployment based on the ratio of old to new. 

Rollback of updates can be applied similarly; simply edit the YAML script to point at the old image and apply it.

## Uninstalling the application

If the application was installed using the Helm chart, uninstalling is as easy as getting the installation name using `helm3 ls`, and then uninstalling using `helm3 uninstall {NAME}`.

If the application was manually deployed, one must manually remove all the yaml files from the cluster with `kubectl delete -f`, followed by each resource.

## Upgrading the application
