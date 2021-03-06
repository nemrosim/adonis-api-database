#!/usr/bin/env bash
source ./constants.sh

# PARAMS
env_param=$1
command_param=$2
flag_param=$3

function is_first_param_valid {
    if [[ "$env_param" == ${PROD} ]] ||
       [[ "$env_param" == ${DEV} ]] ||
       [[ "$env_param" == ${TEST} ]]
       then
          is_first_valid_result=1 #true
        else
          is_first_valid_result=0 #false
    fi
}

function is_second_param_valid {
    if [[ "$command_param" == ${STATUS_COMMAND} ]] ||
       [[ "$command_param" == ${ROLLBACK_COMMAND} ]] ||
       [[ "$command_param" == ${RUN_COMMAND} ]] ||
       [[ "$command_param" == ${REFRESH_COMMAND} ]] ||
       [[ "$command_param" == ${RESET_COMMAND} ]]
       then
          is_second_valid_result=1 #true
        else
          is_second_valid_result=0 #false
    fi
}

run_command(){
  echo "Running migration:$1 on $2 environment"
  echo
    if [[ "$env_param" == ${PROD} ]]; then
      if [[ -z "$flag_param" ]]; then
        cd ../.. && ENV_PATH=${PROD_ENV_FILE} adonis migration:$1
      else
        cd ../.. && ENV_PATH=${PROD_ENV_FILE} adonis migration:$1 "$flag_param"
      fi
    fi
    if [[ "$env_param" == ${DEV} ]]; then
        if [[ -z "$flag_param" ]]; then
          cd ../.. && ENV_PATH=${DEVELOPMENT_ENV_FILE} adonis migration:$1
        else
          cd ../.. && ENV_PATH=${DEVELOPMENT_ENV_FILE} adonis migration:$1 "$flag_param"
        fi
    fi
    if [[ "$env_param" == ${TEST} ]]; then
      if [[ -z "$flag_param" ]]; then
        cd ../.. && ENV_PATH=${TESTING_ENV_FILE} adonis migration:$1
      else
        cd ../.. && ENV_PATH=${TESTING_ENV_FILE} adonis migration:$1 "$flag_param"
      fi
    fi
}

validate_and_run() {
  is_first_param_valid
  is_second_param_valid

  if [[ is_first_valid_result -eq 1 ]] && [[ is_second_valid_result -eq 1 ]]; then

      if [[ "$env_param" == ${PROD} ]];then
        echo
        echo "Do you really want to run ${txBold}${txUnderline}$1${txReset} command on ${txBold}${txUnderline}$2${txReset} environment. Continue (yes/no)?"
          read choice

          if [[ "$choice" == "yes" ]]; then
            run_command ${command_param} ${env_param}
          else
            echo "You entered $choice. Script will not be executed"
          fi
      else
        run_command ${command_param} ${env_param}
      fi
  else
    echo
    echo "Some parameter is not valid. First param: ${env_param}. Second param: ${command_param}"
      exit 1
  fi
}

validate_and_run ${command_param} ${env_param}
