import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { toast } from "react-toastify";
import { VERIFY_EMAIL_RESET } from "../../redux/constant/verify.emai.constant";
import { verifyEmailAction, verifyListAction } from "../../redux/actions/verify.email.action";
import ExportHelper from "../../helpers/export.helper";
import { getDefinitionList } from "src/redux/actions/deliverability.action";
import { CustomSelect } from "src/components/custom.select";

const gridStyle = { minHeight: 500 };

const columns = [
  { name: "email_address", defaultFlex: 1, header: "Email" },
  { name: "lists", defaultFlex: 1, header: "List" },
];

export const VerifyEmailTable = () => {
  const [listDefinitionId, setListDefinitionId] = useState("");

  const dispatch = useDispatch();

  const { emails, isLoading, success, error, message } = useSelector((state) => state.verifyEmail);
  const { list, isLoading: listDefinitionLoading } = useSelector(
    (state) => state.listDefinitionDeliverability
  );

  useEffect(() => {
    if (list.length === 0) {
      dispatch(getDefinitionList());
    }
    if (success) {
      toast.success(message);
      dispatch({ type: VERIFY_EMAIL_RESET });
    }
    if (error) {
      toast.error(message);
      dispatch({ type: VERIFY_EMAIL_RESET });
    }
  }, [dispatch, message, success, error, list]);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (!e.target.files) {
      toast.error("Please select file");
      return;
    }
    dispatch(
      verifyEmailAction({
        csv: e.target.files[0],
      })
    );
    e.target.value = "";
  };

  const handleVerifyList = (e) => {
    e.preventDefault();
    if (!e.target.files) {
      toast.error("Please select file");
      return;
    }
    if (listDefinitionId === "") {
      toast.error("Please select list definition");
    } else {
      dispatch(
        verifyListAction({
          csv: e.target.files[0],
          list_id: listDefinitionId.value,
        })
      );
    }
    e.target.value = "";
  };

  const handleExportCSV = () => {
    ExportHelper.generateVerifyEmailCSV(emails);
  };

  const selectListDefinition = useMemo(() => {
    if (list.length > 0) {
      return list.map((l) => ({
        value: l.id,
        label: l.name,
      }));
    }
  }, [list]);

  return (
    <Box sx={{ minWidth: 800 }}>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        sx={{
          mb: 2,
        }}
      >
        <Typography
          sx={{
            marginRight: 5,
          }}
        >
          100,000 rows limit
        </Typography>
        <Button
          variant="contained"
          component="label"
          color="success"
          onClick={handleExportCSV}
          startIcon={<DownloadIcon />}
          sx={{
            marginRight: 2,
          }}
        >
          CSV
        </Button>
        <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
          Verify Blacklist
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
      </Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
        sx={{
          mb: 2,
        }}
      >
        <Box sx={{ minWidth: "300px" }}>
          <CustomSelect
            id="id-list-definition"
            options={selectListDefinition}
            value={listDefinitionId}
            onChange={setListDefinitionId}
            required={false}
            isMulti={false}
            isLoading={listDefinitionLoading}
          />
          {/* {list.length > 0 ? (
            <CustomSelect
              id="id-list-definition"
              options={selectListDefinition}
              value={listDefinitionId}
              onChange={setListDefinitionId}
              required={false}
              isMulti={false}
              isLoading={listDefinitionLoading}
            />
          ) : null} */}
        </Box>
        <Button
          variant="contained"
          component="label"
          color="secondary"
          startIcon={<FormatListBulletedIcon />}
          sx={{
            marginLeft: 2,
          }}
          disabled={listDefinitionLoading}
        >
          Verify List
          <input type="file" hidden onChange={handleVerifyList} />
        </Button>
      </Stack>
      <ReactDataGrid
        columns={columns}
        dataSource={emails}
        style={gridStyle}
        pagination
        loading={isLoading}
        defaultLimit={10}
      />
    </Box>
  );
};
